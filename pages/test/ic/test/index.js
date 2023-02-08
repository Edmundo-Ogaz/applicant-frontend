import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingSpinner from '../../../../components/LoadingSpinner';

import styles from './ic.module.css';

import data from '../data'

export default function IC({id}) {
	console.log('IC')

  const TIME_IN_MINUTES = 8;

  const router = useRouter();

  const [ isSaving, setIsSaving ] = useState(false);

  const [timeAlert, setTimeAlert] = useState(false);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [clockAlert, setClockAlert] = useState(false);
  const [deadline, setDeadline] = useState(new Date(Date.parse(new Date()) + TIME_IN_MINUTES * 60 * 1000));

  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateDiff = Date.parse(deadline) - Date.parse(new Date());
      const newSeconds = Math.floor((dateDiff / 1000) % 60)
      const newMinutes = Math.floor((dateDiff / 1000 / 60) % 60)
      setSeconds(newSeconds)
      setMinutes(newMinutes)
      
      if(newMinutes === 1) {
        setTimeAlert(true)
      } else if(newMinutes === 0) {
          setTimeAlert(false)
          setClockAlert(true)
      } else if(dateDiff <= 0) {
          // action=true;
          // clearInterval(timeinterval);
          // document.getElementById("myForm").submit();// Form submission
          //handleSaving()
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const handleSaving = async (e) => {
    try {
      console.log('handleSave')
      e.preventDefault()
      //if (confirm("¿Desea enviar las respuestas?") == true) {
        setIsSaving(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/ic/${id}`, 
          {
            method: 'PATCH',
            body: JSON.stringify({checks: checkedState}),
            headers: {
              'Content-Type': 'application/json'
            },
          }
        )
        const json = await response.json();
        if (response?.ok === false) {
          throw new Error(json?.error)
        }
        router.push('/test/ic/success')
      //}
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
    }
	};

  const handleCheck = (event) => {
    var updatedList = [...checkedState];
    if (event.target.checked) {
      updatedList = [...checkedState, event.target.value];
    } else {
      updatedList.splice(checkedState.indexOf(event.target.value), 1);
    }
    setCheckedState(updatedList);
  };

  return (
    <>
      <div id="time-alert" className={styles['time-alert']} style={{display: timeAlert ? 'block' : 'none'}}>
        Prepárate, quedan 2 minutos
      </div>
      <div id="content" className={styles.content}>
        <div id="sidebar" className={styles['side-bar']}>
          <h1>TEST IC</h1>
          <hr/>
          <ol>
            <li>
              Escriba una cruz (X) en la columna 1 a la altura de cada seguro de incendios o accidentes, desde 150.000 a 450.000 pesos inclusive, contratado entre el 15 de Marzo de 1975 y el 10 de Mayo de 1976.
            </li>
            <li>
              Escriba una cruz (X) en la columna 2 a la altura de cada seguro de vida o accidentes, hasta 300.000 pesos inclusive, contratado entre el 15 de Octubre de 1975 y el 20 de Agosto de 1976.
            </li>
            <li>
              Escriba una cruz (X) en la columna 3 a la altura de cada seguro de incendios o de vida, desde 200.000 a 500.000 pesos inclusive, contratado entre el 10 de Febrero de 1975 y el 15 de Junio de 1976.
            </li>
          </ol>
          <div id="clock" className={`${styles.clock} ${clockAlert && styles['clock-alert']}`}>
            <p>
              Minutes: <span>{minutes}</span>
              <br/>
              Seconds: <span>{seconds}</span>
            </p>
          </div>
          <button 
            className={`${styles.button} ${styles['button--lg']} ${styles['button--warning']}`} 
            onClick={ handleSaving } 
            disabled={ isSaving }>
            {isSaving ? 'Saving...' : 'ENVIAR RESPUESTAS'}
          </button>
        </div>
        <div id="test" className={styles.test}>
          <form id="myForm" method="post">
            <table className={styles.table}>
              <thead className="list-header">
                <tr>
                  <th>
                  CANTIDAD ASEGURADA
                  </th>
                  <th>
                  CLASES DE SEGURO
                  </th>
                  <th>
                  FECHA
                  </th>
                  <th>
                  1
                  </th>
                  <th>
                  2
                  </th>
                  <th>
                  3
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => 
                  (<tr key={index} className="list-body-row">
                    <td>{row.cantidadAsegurada}</td>
                    <td>{row.claseDeSeguro}</td>
                    <td>{row.fecha}</td>
                    <td>
                      <label className={styles['disc-container']}>
                        <input type="checkbox" id="checkItem" name="check[]" value={row.uno} onChange={handleCheck}/>
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td>
                      <label className={styles['disc-container']}>
                        <input type="checkbox" id="checkItem" name="check[]" value={row.dos} onChange={handleCheck}/>
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td>
                      <label className={styles['disc-container']}>
                        <input type="checkbox" id="checkItem" name="check[]" value={row.tres} onChange={handleCheck}/>
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                  </tr>)
                )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      {isSaving && <LoadingSpinner/>}
      <ToastContainer />
    </>
  );
}

export async function getServerSideProps({query}) {
  try {
    console.log('getServerSideProps',query.id);
    if (isNaN(query.id)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error?message=Problemas al obtener parametros",
        }
      };
    }
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${query.id}`
    console.log('getServerSideProps', URL);

    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    if (Object.keys(testsPortulants).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/error?message=No se pudo obtener el test del postulanta",
        }
      };
    }
    return {
      props: {
        id: testsPortulants.id,
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}