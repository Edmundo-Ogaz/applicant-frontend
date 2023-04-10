import { useState, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Table from '@/components/table/index'

import Cookie from '@/utils/Cookie'
import DateUtil from '@/utils/DateUtil.js';

export default function List({companies, profiles}) {
	console.log('List')

  const ROWS_PER_PAGE = 5
  const COLUMS = [ 
    {name: 'RUT'},
    {name: 'Nombre'},
    {name: 'Email'},
    {name: 'Empresa'},
    {name: 'Rol'},
    {name: 'Password Actualizado'},
    {name: 'Acciones'},
  ]

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

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
          <Link
            href={{
              pathname: `/user/password/link`,
              query: { id: user.id }
            }}
          >
            <Image src="/images/edit_password.svg" alt="password" width="24" height="24" />
          </Link>
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

  return (
    <>
      <Layout>
        <h2>Usuarios</h2>
        <form>
          <fieldset className='search__filter'>
            <legend className='search__filter-header'>Filtro</legend>
            <label forhtml="rut">
              <span>Rut</span>
              <input type="text" id="rut" className="search__input" onChange={ handleRut } />
            </label>
            <label forhtml="email">
              <span>Email</span>
              <input type="text" id="email" size="50" className="search__input" onChange={ handleEmail } />
            </label>
            <label forhtml="name">
              <span>Nombre</span>
              <input type="text" id="name" size="60" className="search__input" onChange={ handleName } />
            </label>
            <label forhtml="company">
              <span>Empresa</span>
              <select name="company" id="company" value={company} className="search__input" disabled={true} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span>Rol</span>
              <select name="profile" id="profile" className="search__input" onChange={ handleProfile}>
                <option value="">Selecionar...</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="search" onClick={ handleSearchButton } disabled={ isSearching }>
            {isSearching ? 'Searching...' : 'Search'}
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