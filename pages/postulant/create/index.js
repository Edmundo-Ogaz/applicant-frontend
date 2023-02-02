import { useState } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';

import Cookie from '../../../utils/Cookie.js';

import styles from './create.module.css';

export default function CreatePostulant() {
	console.log('CreatePostulant')

  const [ saving, setSaving ] = useState();

  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ age, setAge ] = useState();
  const [ sexo, setSexo ] = useState();
  const [ email, setEmail ] = useState();

  const handleSave = async () => {
    try {
      console.log('handleSave')
      setSaving(true)
      const data = {
        rut, 
        firstName, 
        lastName, 
        age, 
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
  
  function handleAge(event) {
		setAge(event.target.value)
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
                <input type="text" id="rut" className={styles.user__input} onChange={ handleRut } />
              </label>
              <label forhtml="firt_name">
                <span className={styles['user__label-text']}>Nombres</span>
                <input type="test" id="firt_name" size="50" className={styles.user__input} onChange={ handleFirstName } />
              </label>
              <label forhtml="last_name">
                <span className={styles['user__label-text']}>Apellidos</span>
                <input type="text" id="last_name" size="50" className={styles.user__input} onChange={ handleLastName } />
              </label>
              <label forhtml="age">
                <span className={styles['user__label-text']}>Edad</span>
                <input type="number" id="age" min="1" max="100" className={styles.user__input} onChange={ handleAge } />
              </label>
              <label forhtml="sexo">
                <span className={styles['user__label-text']}>Sexo</span>
                <select name="sexo" id="sexo" className={styles.user__input} onChange={ handleSexo}>
                  <option value="">Selecionar...</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </label>
              <label forhtml="email">
                <span className={styles['user__label-text']}>Email</span>
                <input type="text" id="email" size="30"className={styles.user__input} onChange={ handleEmail } />
              </label>
            </fieldset>
            <button className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </form>
      </Layout>
    </>
  );
}

CreatePostulant.Auth = WithPrivateRoute