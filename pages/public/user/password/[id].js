import { useState } from 'react';

import useTranslation from 'next-translate/useTranslation'

import Header from '@/components/header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingSpinner from '@/components/LoadingSpinner';

import styles from './password.module.css';

export default function RegisterPassword({user}) {
	console.log('RegisterPassword')

  const { t, lang } = useTranslation('user')

  const [ isSaving, setIsSaving ] = useState(false);
  const [ password, setPassword ] = useState();
  const [ repeatPassword, setRepeatPassword ] = useState();
  const [ isPasswordCorrect, setIsPasswordCorrect ] = useState(false);
  const [ error, setError ] = useState();

  const handleSave = async () => {
    console.log('handleSave')
    setIsSaving(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${user.id}/password`,
        {
          method: 'PATCH',
          body: JSON.stringify({password}),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      
      toast.success(t('saved'))
      setPassword('');
      setRepeatPassword('')
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
    }
  }

  function handlePassword(event) {
    console.log('handlePassword',event.target.value)
		setPassword(event.target.value)
	}

  function handleRepeatPassword(event) {
    setRepeatPassword(event.target.value)
    setIsPasswordCorrect(password === event.target.value ? true : false)
	}

  function handleSubmit(event) {
    event.preventDefault();
  }
     
  return (
    <>
      <Header />
      <div className={styles.user}>
        <h2>
        {t('title.password')}
        </h2>
        <p>{t('label.name')}: {user.firstName} {user.lastName}</p>
        <p>{t('label.email')}: {user.email}</p>
        <p>{t('label.company')}: {user.company.name}</p>
        <form className={styles.user__form} onSubmit={ handleSubmit }>
          <label forhtml="password" className={styles.user__label}>
            <span className={styles['user__label-text']}>{t('label.password')}</span>
            <input type="password" id="password" value={password} className={styles.user__input} onChange={ handlePassword } />
          </label>
          <label forhtml="repeatPassword" className={styles.user__label}>
            <span className={styles['user__label-text']}>{t('label.repit_password')}</span>
            <input type="password" id="repeatPassword" value={repeatPassword} className={styles.user__input} onChange={ handleRepeatPassword } />
          </label>
          {error && <><small style={ { color: 'red' } }>{error}</small></>}
          <button className={`${styles["user__button"]} ${!isPasswordCorrect && styles["user__button--dissabled"]}` } onClick={ handleSave } disabled={ !isPasswordCorrect || isSaving }>
            {isSaving ? t('button.saving') : t('button.save')}
          </button>
        </form>
      </div>
      {isSaving && <LoadingSpinner/>}
      <ToastContainer />
    </>
  );
}

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps')
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: `/error?message=bad params`,
        }
      };
    }
    const user = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${id}`).then(user => user.json())
    if (Object.keys(user).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: `/error?message=user not found`,
        }
      };
    }
    return {
      props: {
        user
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
