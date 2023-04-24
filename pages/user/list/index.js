import { useState, useEffect } from 'react';

import useTranslation from 'next-translate/useTranslation'

import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Table from '@/components/table/index'

import Cookie from '@/utils/Cookie'
import DateUtil from '@/utils/DateUtil.js';

import ModalLink from '@/components/model/link/index.js'

import styles from './list.module.css'
export default function List({companies, profiles}) {
	console.log('List')

  const { t, lang } = useTranslation('user')

  const ROWS_PER_PAGE = 5
  const COLUMS = [ 
    {name: t('table.head.rut')},
    {name: t('table.head.name')},
    {name: t('table.head.email')},
    {name: t('table.head.company')},
    {name: t('table.head.role')},
    {name: t('table.head.date_password_updated')},
    {name: t('table.head.actions')},
  ]

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

  const [ search, setSearch ] = useState({data: [], total: 0});
  const [currentPage, setCurrentPage] = useState(1);
  const [ user, setUser] = useState(null);
  const [ isOpenModal, setIsOpenModal] = useState(false);

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
      let query = ''
      if (rut)
        query = `rut=${rut}&`

      if (name)
        query += `name=${name}&`
      
      if (email)
        query += `email=${email}&`
      
      if (company)
        query += `company=${company}&`

      if (profile)
        query += `profile=${profile}&`
      
      query += `limit=${ROWS_PER_PAGE}&offset=${offset}`

      handleSearch(query)
      setCurrentPage(currentPage)
    }

    const handleSearch = async (query) => {
    try {
      setIsSearching(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      json.data = json.data.map((user, idx) => [
        user.rut,
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.company.name,
        user.profile.name,
        DateUtil.parse(user.updatedPassword),
        <>
          <Link
            key={idx}
            href={{
              pathname: `/user/edit/${user.id}`,
            }}
          >
            <Image src="/images/edit_icon.svg" alt="edit" width="24" height="24" />
          </Link>
          <Image className={styles['list__icon-password']} src="/images/edit_password.svg" alt="password" width="24" height="24" onClick={() => handleModel(user)} />
        </>
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

  async function handleCompany(event) {
		setCompany(event.target.value)
	}

  function handleProfile(event) {
		setProfile(event.target.value)
	}

  function handlePageChange(page) {
    handleSearchButton(null, (page - 1) * ROWS_PER_PAGE, page);
  }

  async function handleModel(user) {
    setUser(user)
    setIsOpenModal(true)
  }

  return (
    <>
      <Layout>
        <h2>{t('title.list')}</h2>
        <form>
          <fieldset className='search__filter'>
            <legend className='search__filter-header'>{t('title.filter')}</legend>
            <label forhtml="rut">
              <span>{t('label.rut')}</span>
              <input type="text" id="rut" className="search__input" onChange={ handleRut } />
            </label>
            <label forhtml="email">
              <span>{t('label.email')}</span>
              <input type="text" id="email" size="50" className="search__input" onChange={ handleEmail } />
            </label>
            <label forhtml="name">
              <span>{t('label.name')}</span>
              <input type="text" id="name" size="60" className="search__input" onChange={ handleName } />
            </label>
            <label forhtml="company">
              <span>{t('label.company')}</span>
              <select name="company" id="company" value={company} className="search__input" disabled={true} onChange={ handleCompany}>
                <option value="">{t('label.select')}</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span>{t('label.role')}</span>
              <select name="profile" id="profile" className="search__input" onChange={ handleProfile}>
                <option value="">{t('label.select')}</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="search" onClick={ handleSearchButton } disabled={ isSearching }>
            {isSearching ? t('button.searching') : t('button.search')}
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
        { isOpenModal && <ModalLink link={`/user/password/${user.id}`} setIsOpen={setIsOpenModal} /> }
      </Layout>
    </>
  );
}

List.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`)
    const profiles = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/profiles`)
    const data = await Promise.all([companies, profiles])
    .then(responses =>
      Promise.all(responses.map(res => {
        if (res.status !== 200)
          return Promise.reject(new Error(res.statusText))
        return res.json()
      }))
    )
    .catch(error => {
      console.log('reason', error)
      throw error
    });

    return {
      props: {
        companies: data[0],
        profiles: data[1],
      },
    }
  } catch(e) {
    console.error('error', e)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}