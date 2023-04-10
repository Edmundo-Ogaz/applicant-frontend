import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './create.module.css';

export default function CreatePostulant() {
	console.log('CreatePostulant')

  const [ isSaving, setIsSaving ] = useState();

  const [ company, setCompany ] = useState();
  const [ rut, setRut ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ sexo, setSexo ] = useState('');
  const [ email, setEmail ] = useState('');

  useEffect(() => {
    const user = Cookie.getUser()
    setCompany(user.company)
  }, [])

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      setIsSaving(true)
      const data = {
        company,
        rut, 
        firstName, 
        lastName, 
        birthday,
        sexo, 
        email,
        createdBy: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      toast.success('Saved');
      setRut('')
      setFirstName('')
      setLastName('')
      setBirthday('')
      setSexo('')
      setEmail('')
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
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

  function handleBirthday(event) {
    console.log('event.target.value', event.target.value)
		setBirthday(event.target.value)
	}
  
  function handleSexo(event) {
		setSexo(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}
     
  return (
    <>
      <Layout>
          <h2>Crear Postulante</h2>
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
              <label forhtml="birthday">
                <span className={styles['user__label-text']}>Fecha Nacimiento</span>
                <input type="date" id="birthday" name="birthday" value={birthday} min="1900-01-01" max="2023-12-31" className={styles.user__input} onChange={ handleBirthday } />
              </label>
              <label forhtml="sexo">
                <span className={styles['user__label-text']}>Sexo</span>
                <select name="sexo" id="sexo" value={sexo} className={styles.user__input} onChange={ handleSexo}>
                  <option value="">Selecionar...</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </label>
              <label forhtml="email">
                <span className={styles['user__label-text']}>Email</span>
                <input type="text" id="email" value={email} size="30"className={styles.user__input} onChange={ handleEmail } />
              </label>
            </fieldset>
            <button id="save" className={styles['user__button']} onClick={ handleSave } disabled={ isSaving }>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </form>
        {(isSaving) && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

CreatePostulant.Auth = WithPrivateRoute