import { useState } from 'react';

import { toast } from 'react-toastify'

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './create.module.css';

export default function CreateUser({companies, profiles}) {
	console.log('CreateUser')

  const [ saving, setSaving ] = useState();
  
  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

  const handleSave = async (e) => {
    try {
      console.log('handleSave')
      e.preventDefault()
      setSaving(true)
      const data = {
        rut, 
        firstName, 
        lastName, 
        email, 
        company, 
        profile,
        createdBy: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const json = await response.json();
        if (response?.ok === false) {
          throw new Error(json?.error)
        }
        toast.success('Saved');
        setRut('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompany('');
        setProfile('');
    } catch(e) {
      toast.error(e.message);
    } finally {
      setSaving(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleFirstName(event) {
		setFirstName(event.target.value)
	}

  function handleLastName(event) {
		setLastName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}

  function handleCompany(event) {
		setCompany(event.target.value)
	}

  function handleProfile(event) {
		setProfile(event.target.value)
	}
     
  return (
    <>
      <Layout>
        <h2>Crear Usuario</h2>
        <form>
          <fieldset className={styles.user__body}>
            <label forhtml="rut">
              <span className={styles['user__label-text']}>Rut</span>
              <input type="text" id="rut" value={rut} className={styles.user__input} onChange={ handleRut } />
            </label>
            <label forhtml="firstName">
              <span className={styles['user__label-text']}>Nombres</span>
              <input type="test" id="firstName" value={firstName} size="50" className={styles.user__input} onChange={ handleFirstName } />
            </label>
            <label forhtml="lastName">
              <span className={styles['user__label-text']}>Apellidos</span>
              <input type="text" id="lastName" value={lastName} size="50" className={styles.user__input} onChange={ handleLastName } />
            </label>
            <label forhtml="email">
              <span className={styles['user__label-text']}>Email</span>
              <input type="text" id="email" value={email} size="30"className={styles.user__input} onChange={ handleEmail } />
            </label>
            <label forhtml="company">
              <span className={styles['user__label-text']}>Empresa</span>
              <select name="company" id="company" value={company} className={styles.user__input} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span className={styles['user__label-text']}>Perfil</span>
              <select name="profile" id="profile" value={profile} className={styles.user__input} onChange={ handleProfile}>
                <option value="">Selecionar...</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="save" className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
        {saving && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

CreateUser.Auth = WithPrivateRoute

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
    console.error(e)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}
