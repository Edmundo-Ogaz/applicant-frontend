import { useEffect, useState } from 'react'

import useTranslation from 'next-translate/useTranslation'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../components/WithPrivateRoute.js'

import Layout from "../../components/layout";
import LoadingSpinner from '../../components/LoadingSpinner/index.js';

import Table from '@/components/table/index'

import Cookie from '@/utils/Cookie'
import DateUtil from '@/utils/DateUtil.js'

import ModalInstruction from '@/components/model/instruction/index.js'
import ModalCertificate from '@/components/model/certificate/index.js'

import styles from './search.module.css'

export default function Search({companies, tests, states}) {
	console.log('Search')

  const { t, lang } = useTranslation('page')
  
  const ROWS_PER_PAGE = 10
  const COLUMS = [ 
    {name: t('search.candidate'), style: {width: 'calc(15%)'}},
    {name: t('search.email'),  style: {width: 'calc(15%)'}},
    {name: t('search.empresa'),  style: {width: 'calc(10%)'}},
    {name: t('search.analista'),  style: {width: 'calc(15%)'}},
    {name: t('search.test'),  style: {width: 'calc(5%)'}},
    {name: t('search.estado'),  style: {width: 'calc(5%)'}},
    {name: t('search.createAt'),  style: {width: 'calc(15%)'}},
    {name: t('search.updateAt'), style: {width: 'calc(15%)'}},
  ]

  const Modals = []
  Modals[process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID] = ModalInstruction
  Modals[process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID] = ModalCertificate

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

  const [ search, setSearch ] = useState({data: [], total: 0});
  const [currentPage, setCurrentPage] = useState(1);

  const [ analysts, setAnalysts ] = useState([]);

  useEffect(() => {
    const user = Cookie.getUser()
    setCompany(user.company)
    searchAnalyst(user.company)
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
        query += `rut=${rut}&`

      if (name)
        query += `name=${name}&`
      
      if (email)
        query += `email=${email}&`
      
      if (company)
        query += `company=${company}&`

      if (analyst)
        query += `analyst=${analyst}&`

      if (test)
        query += `test=${test}&`
      
      if (state)
        query += `state=${state}&`

      query += `limit=${ROWS_PER_PAGE}&offset=${offset}`

      handleSearch(query)
      setCurrentPage(currentPage)
  }

  const handleSearch = async (query) => {
    try {
      setIsSearching(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      json.data = json.data.map((item, idx) => {
        const user = Cookie.getUser()
        let element = `${item.postulant.firstName} ${item.postulant.lastName}`
        if (item.state.id == process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID) {
          element = <a key={idx} href="#" onClick={ () => handleModel(item.id) }>
            {item.postulant.firstName} {item.postulant.lastName}
          </a>
        } else if (item.state.id == process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID) {
          if (user.profile == process.env.NEXT_PUBLIC_PROFILE_ADMIN_ID
            || (user.profile == process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID 
              && item.analyst.id == user.id)) {
                element = <a key={idx} href="#" onClick={ () => handleModel(item.id) }>
                  {item.postulant.firstName} {item.postulant.lastName}
                </a>
          }
        }
        return [
        element,
        item.postulant.email,
        item.company.name,
        `${item.analyst.firstName} ${item.analyst.lastName}`,
        item.test.name,
        item.state.name,
        DateUtil.parse(item.createdAt),
        DateUtil.parse(item.updatedAt)
      ]})
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
    const companyId = event.target.value
    setCompany(event.target.value)
    searchAnalyst(companyId)
  }
  async function searchAnalyst(companyId) {
    try {
      setIsSearching(true)
      const URL_BASE = process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API
      const PROFILE_ADMIN_ID = process.env.NEXT_PUBLIC_PROFILE_ADMIN_ID
      const PROFILE_ANALYST_ID = process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID
      const analyst = await fetch(
        `${URL_BASE}/users?company=${companyId}&profiles=${PROFILE_ADMIN_ID},${PROFILE_ANALYST_ID}`,
      )
      .then(users => users.json())
      setAnalysts(analyst.data)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
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

  function handlePageChange(page) {
    handleSearchButton(null, (page - 1) * ROWS_PER_PAGE, page);
  }

  async function handleModel(id) {
    const testPostulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
      .then(testPortulant => testPortulant.json())
    setTestPostulant(testPostulant)
    setIsOpenModal(true)
  }

  function Modal() {
    const Modal = Modals[testPostulant.state.id]
    return <Modal testPostulant={testPostulant} setIsOpen={setIsOpenModal} />
  }
     
  return (
    <>
      <Layout>
        {/* <h2>Buscar Tests</h2> */}
        <form>
          <fieldset className='search__filter'>
            <legend className='search__filter-header'>{t('search.filtro')}</legend>
            <label forhtml="rut">
              <span>{t('search.rut')}</span>
              <input type="text" id="rut" className="search__input" onChange={ handleRut } />
            </label>
            <label forhtml="name">
              <span>{t('search.nombre')}</span>
              <input type="text" id="name" size="50" className="search__input" onChange={ handleName } />
            </label>
            <label forhtml="email">
              <span>{t('search.email')}</span>
              <input type="text" id="email" size="50" className="search__input" onChange={ handleEmail } />
            </label>
            <label forhtml="company">
              <span>{t('search.empresa')}</span>
              <select name="company" id="company" value={company} className="search__input" disabled={true} onChange={ handleCompany}>
                <option value="">{t('search.selecionar')}</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="analyst">
              <span>{t('search.analista')}</span>
              <select name="analyst" id="analyst" className="search__input" onChange={ handleAnalyst}>
                <option value="">{t('search.selecionar')}</option>
                {analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.firstName} {analyst.lastName}</option>)}
              </select>
            </label>
            <label forhtml="test">
              <span>{t('search.test')}</span>
              <select name="test" id="test" className="search__input" onChange={ handleTest}>
                <option value="">{t('search.selecionar')}</option>
                {tests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
              </select>
            </label>
            <label forhtml="state">
              <span>{t('search.estado')}</span>
              <select name="state" id="state" className="search__input" onChange={ handleState}>
                <option value="">{t('search.selecionar')}</option>
                {states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="search" className={styles.search__button} onClick={ handleSearchButton } disabled={ isSearching }>
            {isSearching ? t('search.searching') : t('search.search')}
          </button>
        </form>
        <Table
          colums={COLUMS}
          data={search.data}
          currentPage={currentPage}
          totalPages={search.total && Math.ceil(search.total / ROWS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
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