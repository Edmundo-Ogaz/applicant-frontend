import { useState, useEffect } from 'react';

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
  const [ company, setCompany ] = useState('');
  const [ analyst, setAnalyst ] = useState('');

  const [ analysts, setAnalysts ] = useState([]);

  const [testCheckboxs, setTestCheckboxs] = useState(tests.map((test) => ({checked: false, ...test})));

  useEffect(() => {
    const user = Cookie.getUser()
    setCompany(user.company)
    searchAnalyst(user.company)
  }, [])

  const handleSearch = async (e) => {
    try {
      e.preventDefault()
      setIsSearching(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?company=${company}&rut=${rut}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      } else if (!Array.isArray(json.data) ||  json.data.length != 1) {
        throw new Error('NOT_FOUND')
      }

      setPostulantId(json.data[0].id)
      setFirstName(json.data[0].firstName)
      setLastName(json.data[0].lastName)
      setEmail(json.data[0].email)
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

      const testIds = []
      for (const checkbox of testCheckboxs) {
        if (checkbox.checked)
          testIds.push(checkbox.id)
      }

      const assigner = {
        companyId: company,
        analystId: analyst,
        testIds,
        createdById: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants/${postulantId}`,
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
      setTestCheckboxs(tests.map((test) => ({checked: false, ...test})))
      setAnalyst('')

      const dataMail = {
        postulantId: postulantId,
        testsAssignedIds: json,
        host: location.protocol+'//'+location.host

      }
      fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/mails`,
        {
          method: 'POST',
          body: JSON.stringify(dataMail),
          headers: {
            'Content-Type': 'application/json'
          },
        })
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  const handleCheck = (index) => {
    const updatedList = [...testCheckboxs];
    updatedList[index].checked = !updatedList[index].checked;
    setTestCheckboxs(updatedList);
    console.log('handleCheck')
  }

  async function handleCompany(event) {
    const companyId = event.target.value
    setCompany(companyId)
    searchAnalyst(companyId)
  }

  async function searchAnalyst(companyId) {
    try {
      setIsSearching(true)
      const URL_BASE = process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API
      const PROFILE_ADMIN_ID = process.env.NEXT_PUBLIC_PROFILE_ADMIN_ID
      const PROFILE_ANALYST_ID = process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID
      const response = await fetch(
        `${URL_BASE}/users?company=${companyId}&profiles=${PROFILE_ADMIN_ID},${PROFILE_ANALYST_ID}`,
      )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setAnalysts(json.data)
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
            <label forhtml="company">
              <span className={styles['user__label-text']}>Empresa</span>
              <select name="company" id="company" value={company} className={styles.user__input} disabled={true} onChange={ handleCompany}>
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
            <div id="test">
              <span className={styles['user__label-text']}>Test</span>
              <fieldset className={`${styles.assign__test} ${styles.user__input}`}>
                {tests.map((test, index) => {
                  return <div key={test.id} className={styles['assign__test-item']}>
                    <input type="checkbox" checked={testCheckboxs[index].checked} onChange={() => handleCheck(index)} />
                    <label>{test.name}</label>
                  </div>
                })}
              </fieldset>
            </div>
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
