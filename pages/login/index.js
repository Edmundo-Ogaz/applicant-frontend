import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookie from '../../utils/Cookie';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './login.module.css';

export default function Login({companies}) {
	console.log('Login')
  //Cookie.remove()
  const [ isLoading, setIsLoading ] = useState();
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ company, setCompany ] = useState();
	const [ error, setError ] = useState();

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/login`, 
        {
          method: 'POST',
          body: JSON.stringify({email: username, password, company}),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      Cookie.add(json)
      window.location = '/';
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false)
    }
	};

  function handleUsername(event) {
		setUsername(event.target.value)
	}

  function handlePassword(event) {
		setPassword(event.target.value)
	}

  function handleCompany(event) {
		setCompany(event.target.value)
	}

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        Login
      </div>
      <fieldset className={styles.user__body}>
        <label forhtml="email">
          <span className={styles['user__label-text']}>Email</span>
          <input id="email" type="text" className={styles.user__input} onChange={ handleUsername } />
        </label>
        <label forhtml="email">
          <span className={styles['user__label-text']}>Password</span>
          <input id="password" type="password" className={styles.user__input} onChange={ handlePassword } />
        </label>
        <label forhtml="company">
          <span className={styles['user__label-text']}>Empresa</span>
          <select name="company" id="company" value={company} className={styles.user__input} onChange={ handleCompany}>
            <option value="">Selecionar...</option>
            {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
          </select>
        </label>
      </fieldset>
      {error && <><small style={ { color: 'red' } }>{error}</small></>}
      <button id="login" className={styles['login-button']} onClick={ handleLogin } disabled={ isLoading }>
        {isLoading ? 'Loading...' : 'Log in'}
      </button>
      {isLoading && <LoadingSpinner/>}
      <ToastContainer />
    </div>
    );
}

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`).then((response) => response.json())
    return {
      props: {
        companies
      },
    }
  } catch(e) {
    console.error(e)
    return {
      redirect: {
        permanent: false,
        destination: `/public/error?message=${e.message}`,
      }
    };
  }
}
