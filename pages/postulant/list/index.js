import { useState } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

export default function List() {
	console.log('List')

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();

  const [ postulants, setPostulants ] = useState([]);

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
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setPostulants(json)
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

  return (
    <>
      <Layout>
        <h2>Postulantes</h2>
        <form>
          <fieldset className='search__filter'>
            <legend className='search__filter-header'>Filtro</legend>
            <label forhtml="rut">
              <span>Rut</span>
              <input type="text" id="rut" className="search__input" onChange={ handleRut } />
            </label>
            <label forhtml="name">
              <span>Nombre</span>
              <input type="text" id="name" size="50" className="search__input" onChange={ handleName } />
            </label>
            <label forhtml="email">
              <span>Email</span>
              <input type="text" id="email" size="50" className="search__input" onChange={ handleEmail } />
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
                <th>Edad</th>
                <th>Sexo</th>
                <th>Actualizado</th>
                <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {postulants.map((postulant) => {
              return (<tr key={postulant.id} className="search__list-body-row">
                  <td>{ postulant.rut }</td>
                  <td>{ postulant.firstName } { postulant.lastName }</td>
                  <td>{ postulant.email }</td>
                  <td>{ postulant.age }</td>
                  <td>{ postulant.sexo }</td>
                  <td>{ postulant.createdAt['@ts'] }</td>
                  <td>
                    <Link
                      href={{
                        pathname: `/postulant/edit/${postulant.id}`,
                      }}
                    >
                      <Image src="/images/edit_icon.svg" alt="edit" width="24" height="24" />
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