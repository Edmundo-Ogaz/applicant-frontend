import { useState } from 'react';

import useTranslation from 'next-translate/useTranslation'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'

import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import Cookie from '../../../utils/Cookie.js';
import DateUtil from '@/utils/DateUtil.js';

import styles from './edit.module.css';

export default function EditPostulant({postulant}) {
	console.log('EditPostulant')
  postulant = postulant ? postulant : {} 

  const [ saving, setSaving ] = useState(false);
  
  const [ company, setCompany ] = useState(postulant.company);
  const [ rut, setRut ] = useState(postulant.rut);
  const [ firstName, setFirstName ] = useState(postulant.firstName);
  const [ lastName, setLastName ] = useState(postulant.lastName);
  const [ email, setEmail ] = useState(postulant.email);
  const [ birthday, setBirthday ] = useState(DateUtil.format(postulant.birthday));
  const [ sexo, setSexo ] = useState(postulant.sexo);

  const { t, lang } = useTranslation('postulantEdit')

  const handleSave = async (e) => {
    try {
      e.preventDefault()
      setSaving(true)
      const data = {
        company,
        rut, 
        firstName, 
        lastName, 
        email, 
        birthday,
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
      toast.success(t('saved'));
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

  function handleBirthday(event) {
		setBirthday(event.target.value)
	}

  function handleSexo(event) {
		setSexo(event.target.value)
	}
     
  return (
    <>
      <Layout>
        <h2>{t('title')}</h2>
        <form>
          <fieldset className={styles.user__body}>
            <label forhtml="rut">
              <span className={styles['user__label-text']}>{t('rut')}</span>
              <input type="text" id="rut" value={rut} className={styles.user__input} disabled={true}/>
            </label>
            <label forhtml="firstName">
              <span className={styles['user__label-text']}>{t('firstname')}</span>
              <input type="test" id="firstName" value={firstName} size="50" className={styles.user__input} onChange={ handleFirstName } />
            </label>
            <label forhtml="lastName">
              <span className={styles['user__label-text']}>{t('lastname')}</span>
              <input type="text" id="lastName" value={lastName} size="50" className={styles.user__input} onChange={ handleLastName } />
            </label>
            <label forhtml="email">
              <span className={styles['user__label-text']}>{t('email')}</span>
              <input type="text" id="email" value={email} size="30"className={styles.user__input} onChange={ handleEmail } />
            </label>
            <label forhtml="birthday">
                <span className={styles['user__label-text']}>{t('birthday')}</span>
                <input type="date" id="birthday" name="birthday" value={birthday} min="1900-01-01" max="2023-12-31" className={styles.user__input} onChange={ handleBirthday } />
              </label>
            <label forhtml="sexo">
              <span className={styles['user__label-text']}>{t('sex')}</span>
              <select name="sexo" id="sexo" value={sexo} className={styles.user__input} onChange={ handleSexo}>
                <option value="">{t('select')}</option>
                <option value="femenino">{t('female')}</option>
                <option value="masculino">{t('male')}</option>
              </select>
            </label>
          </fieldset>
          <button id="save" className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
            {saving ? t('saving') : t('save')}
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
