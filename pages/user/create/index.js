import { useState, useEffect } from 'react';

import useTranslation from 'next-translate/useTranslation'

import { toast } from 'react-toastify'

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './create.module.css';

export default function CreateUser({companies, profiles}) {
	console.log('CreateUser')

  const { t, lang } = useTranslation('user')

  const [ saving, setSaving ] = useState();
  
  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

  useEffect(() => {
    const user = Cookie.getUser()
    setCompany(user.company)
  }, [])

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
        <h2>{t('title.create')}</h2>
        <form>
          <fieldset className={styles.user__body}>
            <label forhtml="rut">
              <span className={styles['user__label-text']}>{t('label.rut')}</span>
              <input type="text" id="rut" value={rut} className={styles.user__input} onChange={ handleRut } />
            </label>
            <label forhtml="firstName">
              <span className={styles['user__label-text']}>{t('label.firstname')}</span>
              <input type="test" id="firstName" value={firstName} size="50" className={styles.user__input} onChange={ handleFirstName } />
            </label>
            <label forhtml="lastName">
              <span className={styles['user__label-text']}>{t('label.lastname')}</span>
              <input type="text" id="lastName" value={lastName} size="50" className={styles.user__input} onChange={ handleLastName } />
            </label>
            <label forhtml="email">
              <span className={styles['user__label-text']}>{t('label.email')}</span>
              <input type="text" id="email" value={email} size="30"className={styles.user__input} onChange={ handleEmail } />
            </label>
            <label forhtml="company">
              <span className={styles['user__label-text']}>{t('label.company')}</span>
              <select name="company" id="company" value={company} className={styles.user__input} disabled={true} onChange={ handleCompany}>
                <option value="">{t('label.select')}</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="profile">
              <span className={styles['user__label-text']}>{t('label.role')}</span>
              <select name="profile" id="profile" value={profile} className={styles.user__input} onChange={ handleProfile}>
                <option value="">{t('label.select')}</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
              </select>
            </label>
          </fieldset>
          <button id="save" className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
            {saving ? t('button.saving') : t('button.save')}
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
