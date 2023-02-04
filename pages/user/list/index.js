import { useState } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

export default function List({companies, profiles}) {
	console.log('List')

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

  const [ users, setUsers ] = useState([]);

  const handleSearch = async () => {
    console.log('handleSearch')
    setIsSearching(true)
    try {
      let query = ''
      if (rut)
        query = `rut=${rut}`

      if (name)
        query = `name=${name}`
      
      if (email)
        query = `email=${email}`
      
      if (company)
        query = `company=${company}`

      if (profile)
        query = `profile=${profile}`
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setUsers(json)
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
    const companyId = event.target.value
		setCompany(event.target.value)
	}

  function handleProfile(event) {
		setProfile(event.target.value)
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
              <select name="company" id="company" className="search__input" onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span>Perfil</span>
              <select name="profile" id="profile" className="search__input" onChange={ handleProfile}>
                <option value="">Selecionar...</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="search" onClick={ handleSearch } disabled={ isSearching }>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        <table className="search__list">
          <thead className="search__list-header">
            <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Empresa</th>
                <th>Perfil</th>
                <th>Password Actualizado</th>
                <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (<tr key={user.id} className="search__list-body-row">
                  <td>{ user.rut }</td>
                  <td>{ user.firstName } { user.lastName }</td>
                  <td>{ user.email }</td>
                  <td>{ user.company.name }</td>
                  <td>{ user.profile.name }</td>
                  <td>{ user.updatedAt['@ts'] }</td>
                  <td>
                    <Link
                      href={{
                        pathname: `/user/edit/${user.id}`,
                      }}
                    >
                      <Image src="/images/edit_icon.svg" alt="edit" width="24" height="24" />
                    </Link>
                    <Link
                      href={{
                        pathname: `/user/password/${user.id}`,
                      }}
                    >
                      <Image src="/images/edit_password.svg" alt="password" width="24" height="24" />
                    </Link>
                  </td>
              </tr>)
            })}
          </tbody>
        </table>
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

List.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`).then(companies => companies.json())
    const profiles = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/profiles`).then(profiles => profiles.json())
    let data = await Promise.all([companies, profiles])
    console.log('getServerSideProps', companies)
    return {
      props: {
        companies: data[0],
        profiles: data[1],
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}