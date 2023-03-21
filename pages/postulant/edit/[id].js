import { useState } from 'react';

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';

import styles from './edit.module.css';

export default function EditPostulant({postulant}) {
	console.log('EditPostulant')
  postulant = postulant ? postulant : {} 

  const [ saving, setSaving ] = useState(false);
  
  const [ rut, setRut ] = useState(postulant.rut);
  const [ firstName, setFirstName ] = useState(postulant.firstName);
  const [ lastName, setLastName ] = useState(postulant.lastName);
  const [ email, setEmail ] = useState(postulant.email);
  const [ age, setAge ] = useState(postulant.age ? postulant.age : 0);
  const [ sexo, setSexo ] = useState(postulant.sexo);

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      setSaving(true)
      const data = {
        rut, 
        firstName, 
        lastName, 
        email, 
        age, 
        sexo, 
        updatedBy: Cookie.getUser().id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants/${postulant.id}`,
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

  function handleAge(event) {
		setAge(event.target.value)
	}

  function handleSexo(event) {
		setSexo(event.target.value)
	}
     
  return (
    <>
      <Layout>
        <h2>Actualizar Postulante</h2>
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
            {/* <label forhtml="age">
              <span className={styles['user__label-text']}>Edad</span>
              <input type="number" id="age" value={age} min="1" max="100" className={styles.user__input} onChange={ handleAge } />
            </label> */}
            <label forhtml="sexo">
              <span className={styles['user__label-text']}>Sexo</span>
              <select name="sexo" id="sexo" value={sexo} className={styles.user__input} onChange={ handleSexo}>
                <option value="">Selecionar...</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
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

EditPostulant.Auth = WithPrivateRoute

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps')
    const id = params.id
    
    const postulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants/${id}`).then(user => user.json())
    return {
      props: {
        postulant
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
