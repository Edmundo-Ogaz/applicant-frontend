import { useState } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './assign.module.css';

export default function AssignTest({companies, tests}) {
	console.log('AssignTest')

  const [ isSaving, setIsSaving ] = useState(false);
  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');

  const [ postulantId, setPostulantId ] = useState('');
  const [ testId, setTestId ] = useState('');
  const [ company, setCompany ] = useState('');
  const [ analyst, setAnalyst ] = useState('');

  const [ analysts, setAnalysts ] = useState([]);

  const handleSearch = async (e) => {
    try {
      e.preventDefault()
      setIsSearching(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?rut=${rut}`,
        )
      const arrJson = await response.json();
      if (response?.ok === false) {
        throw new Error(arrJson?.error)
      } else if (!Array.isArray(arrJson) ||  arrJson.length != 1) {
        throw new Error('NOT_FOUND')
      }
      setPostulantId(arrJson[0].id)
      setFirstName(arrJson[0].firstName)
      setLastName(arrJson[0].lastName)
      setEmail(arrJson[0].email)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
  }

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      setIsSaving(true)
      const assigner = {
        companyId: company, 
        analystId: analyst, 
        createdById: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/${testId}/postulants/${postulantId}`,
        {
          method: 'POST',
          body: JSON.stringify(assigner),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      
      toast.success('Saved');
      setRut('')
      setPostulantId('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setTestId('')
      setCompany('')
      setAnalyst('')
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}
  
  function handleTest(event) {
		setTestId(event.target.value)
	}

  async function handleCompany(event) {
    try {
      setIsSearching(false)
      const companyId = event.target.value
      setCompany(event.target.value)
      const URL_BASE = process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API
      const PROFILE_ANALYST_ID = process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID
      const response = await fetch(
        `${URL_BASE}/users?companyId=${companyId}&profileId=${PROFILE_ANALYST_ID}`,
      )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setAnalysts(json)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
	}

  function handleAnalyst(event) {
		setAnalyst(event.target.value)
	}
     
  return (
    <>
      <Layout>
        <h2>Asignar Test a Postulante</h2>
        <form>
          <fieldset className={styles.user__body}>
            <section id="search-section">
              <label forhtml="rut">
                <span className={styles['user__label-text']}>Rut</span>
                <input type="text" id="rut" value={rut} className={styles.user__input} onChange={ handleRut } />
              </label>
              <button id="search-button" className={styles['user__button']} onClick={ handleSearch } disabled={ isSearching }>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
              <p>Nombre: {firstName} {lastName}</p>
              <p>Email: {email}</p>
            </section>
            <label forhtml="test">
              <span className={styles['user__label-text']}>Test</span>
              <select name="test" id="test" value={testId} className={styles.user__input} onChange={ handleTest}>
                <option value="">Selecionar...</option>
                {tests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
              </select>
            </label>
            <label forhtml="company">
              <span className={styles['user__label-text']}>Empresa</span>
              <select name="company" id="company" value={company} className={styles.user__input} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="analyst">
              <span className={styles['user__label-text']}>Analista</span>
              <select name="analyst" id="analyst" value={analyst} className={styles.user__input} onChange={ handleAnalyst}>
                <option value="">Selecionar...</option>
                {analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.firstName} {analyst.lastName}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="save-button" className={styles['user__button']} onClick={ handleSave } disabled={ isSaving }>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          </form>
        {(isSearching || isSaving) && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

AssignTest.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`)
    const tests = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests`)
    const data = await Promise.all([companies, tests])
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
        tests: data[1]
      },
    }
  } catch(e) {
    console.log(e)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}
