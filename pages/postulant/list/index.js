import { useState, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import useTranslation from 'next-translate/useTranslation'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Table from '@/components/table/index'

import DateUtil from '@/utils/DateUtil.js';

import Cookie from '@/utils/Cookie'

export default function List() {
	console.log('List')

  const { t, lang } = useTranslation('postulantList')
  
  const ROWS_PER_PAGE = 5
  const COLUMS = [ 
    {name: t('rut')},
    {name: t('firstname')},
    {name: t('email')},
    {name: t('birthday')},
    {name: t('sex')},
    {name: t('actions')},
  ]

  const [ isSearching, setIsSearching ] = useState(false);

  const [ company, setCompany ] = useState();
  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();

  const [ search, setSearch ] = useState({data: [], total: 0});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const user = Cookie.getUser()
    setCompany(user.company)
    handleSearchInit(user.company)
  }, [])

  const handleSearchInit = async (company, offset = 0) => {
    let query = `company=${company}&`
    query += `limit=${ROWS_PER_PAGE}&offset=${offset}`
    handleSearch(query)
  }

  const handleSearchButton = async (e, offset = 0, currentPage = 1) => {
    e?.preventDefault()
    let query = `company=${company}&`
  
    if (rut)
      query += `rut=${rut}&`

    if (name)
      query += `name=${name}&`
    
    if (email)
      query += `email=${email}&`
    
    query += `limit=${ROWS_PER_PAGE}&offset=${offset}`
    handleSearch(query)
    setCurrentPage(currentPage)
  }

  const handleSearch = async (query) => {
    try {
      setIsSearching(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      json.data = json.data.map((postulant, idx) => [
        postulant.rut,
        `${postulant.firstName} ${postulant.lastName}`,
        postulant.email,
        DateUtil.format(postulant.birthday),
        postulant.sexo,
        <Link
          key={idx}
          href={{
            pathname: `/postulant/edit/${postulant.id}`,
          }}
        >
          <Image src="/images/edit_icon.svg" alt="edit" width="24" height="24" />
        </Link>
      ])
      setSearch(json)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleName(event) {
		setName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}

  function handlePageChange(page) {
    handleSearchButton(null, (page - 1) * ROWS_PER_PAGE, page);
  }

  return (
    <>
      <Layout>
        <h2>Postulantes</h2>
        <form>
          <fieldset className='search__filter'>
            <legend className='search__filter-header'>{t('filter')}</legend>
            <label forhtml="rut">
              <span>{t('rut')}</span>
              <input type="text" id="rut" className="search__input" onChange={ handleRut } />
            </label>
            <label forhtml="name">
              <span>{t('firstname')}</span>
              <input type="text" id="name" size="50" className="search__input" onChange={ handleName } />
            </label>
            <label forhtml="email">
              <span>{t('email')}</span>
              <input type="text" id="email" size="50" className="search__input" onChange={ handleEmail } />
            </label>
          </fieldset>
          <button id="search" onClick={ handleSearchButton } disabled={ isSearching }>
            {isSearching ? t('searching') : t('search')}
          </button>
        </form>
        <Table 
          colums={COLUMS}
          data={search.data}
          currentPage={currentPage}
          totalPages={search.total && Math.ceil(search.total / ROWS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

List.Auth = WithPrivateRoute