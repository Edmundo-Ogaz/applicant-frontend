import { useState } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../components/WithPrivateRoute.js'

import Layout from "../../components/layout";
import LoadingSpinner from '../../components/LoadingSpinner/index.js';

import ModalUrlInstruction from '@/components/model/instruction/index.js'
import ModalIcCertificate from '@/components/model/ic/index.js'
import ModalDiscCertificate from '@/components/model/disc/index.js'

export default function Search({companies, tests, states}) {
	console.log('Search')

  const Modals = []
  Modals[0] = ModalUrlInstruction
  Modals[process.env.NEXT_PUBLIC_TEST_IC_ID] = ModalIcCertificate
  Modals[process.env.NEXT_PUBLIC_TEST_DISC_ID] = ModalDiscCertificate

  const [ isSearching, setIsSearching ] = useState(false);
  const [ testPostulant, setTestPostulant] = useState(null);
  const [ isOpenModal, setIsOpenModal] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();

  const [ test, setTest ] = useState();
  const [ company, setCompany ] = useState();
  const [ analyst, setAnalyst ] = useState();
  const [ state, setState ] = useState();

  const [ list, setList ] = useState([]);

  const [ analysts, setAnalysts ] = useState([]);

  const handleSearch = async (e) => {
    try {
    console.log('handleSearch')
    e.preventDefault()
    setIsSearching(true)
      let query = ''
      if (rut)
        query = `rut=${rut}`

      if (name)
        query = `name=${name}`
      
      if (email)
        query = `email=${email}`
      
      if (company)
        query = `company=${company}`

      if (analyst)
        query = `analyst=${analyst}`

      if (test)
        query = `test=${test}`
      
      if (state)
        query = `state=${state}`
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setList(json)
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
    try {
      const URL_BASE = process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API
      const PROFILE_ANALYST_ID = process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID
      const USER_ANALYST = await fetch(
        `${URL_BASE}/users?companyId=${companyId}&profileId=${PROFILE_ANALYST_ID}`,
      )
      .then(users => users.json())
      console.log('Saved', USER_ANALYST)
      setAnalysts(USER_ANALYST)
    } catch(e) {
      toast.error(e.message);
    }
	}
  
  function handleTest(event) {
		setTest(event.target.value)
	}

  function handleAnalyst(event) {
		setAnalyst(event.target.value)
	}

  function handleState(event) {
		setState(event.target.value)
	}

  async function handleModel(id) {
    const testPostulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
      .then(testPortulant => testPortulant.json())
    setTestPostulant(testPostulant)
    setIsOpenModal(true)
  }

  function Modal() {
    console.log('modal', testPostulant)
    let Modal
    if (testPostulant.state.id === process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID) {
      console.log('modal', process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID)
      Modal = Modals[testPostulant.test.id]
      return <Modal setIsOpen={setIsOpenModal} testPostulant={testPostulant} />
    } else if (testPostulant.state.id === process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID) {
      console.log('modal', process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID)
      Modal = Modals[0]
      const id = testPostulant.id
      const type = testPostulant.test.name.toLowerCase()
      return <Modal setIsOpen={setIsOpenModal} id={id} type={type} />
    }
    console.log('modal return')
    return
  }
     
  return (
    <>
      <Layout>
        <h2>Buscar Tests</h2>
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
            <label forhtml="company">
              <span>Empresa</span>
              <select name="company" id="company" className="search__input" onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="analyst">
              <span>Analista</span>
              <select name="analyst" id="analyst" className="search__input" onChange={ handleAnalyst}>
                <option value="">Selecionar...</option>
                {analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.firstName} {analyst.lastName}</option>)}
              </select>
            </label>
            <label forhtml="test">
              <span>Test</span>
              <select name="test" id="test" className="search__input" onChange={ handleTest}>
                <option value="">Selecionar...</option>
                {tests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
              </select>
            </label>
            <label forhtml="state">
              <span>Estado</span>
              <select name="state" id="state" className="search__input" onChange={ handleState}>
                <option value="">Selecionar...</option>
                {states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="search" onClick={ handleSearch } disabled={ isSearching }>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        <table className="search__list">
          <thead className="list-header">
            <tr>
              <th>Candidato</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Analista</th>
              <th>Test</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => {
              return(
                <tr key={item.id} className="list-body-row">
                  <td>
                    <a href="#" onClick={ () => handleModel(item.id) }>
                      {item.postulant.firstName} {item.postulant.lastName}
                    </a>
                  </td>
                  <td>
                      {item.postulant.email}
                  </td>
                  <td>{item.company.name}</td>
                  <td>{item.analyst.firstName} {item.analyst.lastName}</td>
                  <td>{item.test.name}</td>
                  <td>{item.state.name}</td>
                  <td>{item.date['@ts']}</td>
                </tr>
                )
              }
            )}
          </tbody>
        </table>
        { isSearching && <LoadingSpinner/> }
        { isOpenModal && <Modal /> }
      </Layout>
    </>
  );
}

Search.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    const companies = fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`)
    const tests = fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests`)
    const states = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/states`)
    const data = await Promise.all([companies, tests, states])
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
        tests: data[1],
        states: data[2],
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}