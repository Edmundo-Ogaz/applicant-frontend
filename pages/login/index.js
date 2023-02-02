import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookie from '../../utils/Cookie';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from './login.module.css';

export default function Login() {
	console.log('Login')
  //Cookie.remove()
  const [ isLoading, setIsLoading ] = useState();
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ error, setError ] = useState();

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/login`, 
        {
          method: 'POST',
          body: JSON.stringify({email: username, password}),
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

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        Login
      </div>
      <input id="email" type="text" style={ {margin: '15px auto'} } onChange={ handleUsername } />
      <input id="password" type="password" style={ {margin: '15px auto'} } onChange={ handlePassword } />
      {error && <><small style={ { color: 'red' } }>{error}</small></>}
      <button id="login" className={styles['login-button']} onClick={ handleLogin } disabled={ isLoading }>
        {isLoading ? 'Loading...' : 'Log in'}
      </button>
      {isLoading && <LoadingSpinner/>}
      <ToastContainer />
    </div>
    );
}
