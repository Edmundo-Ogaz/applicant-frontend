import { useState } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './edit.module.css';

export default function EditUser({user, companies, profiles}) {
	console.log('EditUser')
  user = user ? user : {} 

  const [ saving, setSaving ] = useState(false);
  
  const [ rut, setRut ] = useState(user.rut);
  const [ firstName, setFirstName ] = useState(user.firstName);
  const [ lastName, setLastName ] = useState(user.lastName);
  const [ email, setEmail ] = useState(user.email);
  const [ company, setCompany ] = useState(user.company ? user.company.id : '');
  const [ profile, setProfile ] = useState(user.profile ? user.profile.id : '');

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      setSaving(true)
      const data = {
        rut, 
        firstName, 
        lastName, 
        email, 
        company, 
        profile, 
        updatedBy: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${user.id}`,
        {
          method: 'PATCH',
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
    } catch(e) {
      toast.error(e.message);
    } finally {
      setSaving(false)
    }
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
        <h2>Actualizar Usuario</h2>
        <form>
          <fieldset className={styles.user__body}>
            <label forhtml="rut">
              <span className={styles['user__label-text']}>Rut</span>
              <input type="text" id="rut" value={rut} className={styles.user__input} disabled={true}/>
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
              <select name="company" id="company" value={company} className={styles.user__input} disabled={true} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((param) => 
                  <option key={param.id} value={param.id}>{param.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span className={styles['user__label-text']}>Rol</span>
              <select name="profile" id="profile" value={profile} className={styles.user__input} onChange={ handleProfile}>
                <option value="">Selecionar...</option>
                {profiles.map((param) => 
                  <option key={param.id} value={param.id}>{param.name}</option>)}
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

EditUser.Auth = WithPrivateRoute

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps')
    const id = params.id
    
    const user = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${id}`)
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`)
    const profiles = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/profiles`)
    const data = await Promise.all([user, companies, profiles])
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
        user: data[0],
        companies: data[1],
        profiles: data[2],
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
