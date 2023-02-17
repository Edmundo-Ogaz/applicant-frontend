import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingSpinner from '@/components/LoadingSpinner/index.js';

import data from './data.json'

import styles from './disc.module.css'

export default function DISC({ id }) {
  console.log('DISC')

  const router = useRouter();

  const [ isSaving, setIsSaving ] = useState(false);

  const [ counter, setCounter ] = useState(0);
  const [masCheckedState, setMasCheckedState] = useState([]);
  const [menosCheckedState, setMenosCheckedState] = useState([]);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const card = document.querySelector(`#card_${i}`)
      card.addEventListener("animationend", (e) => {
        card.classList.remove("apply-shake");
      });
    }
  }, []);

  const handleSaving = async (e) => {
    try {
      console.log('handleSave')
      e.preventDefault()
      //if (confirm("¿Desea enviar las respuestas?") == true) {
      setIsSaving(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/disc/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ masChecks: masCheckedState, menosChecks: menosCheckedState }),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      router.push('/test/disc/success')
      //}
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsSaving(false)
    }
  };

  const handleCheck = (event) => {
    console.log('handleCheck')
  }

  function nextCard(event) {
    console.log('masCheckedState', masCheckedState);
    console.log('menosCheckedState', menosCheckedState);
    const number = event.target.getAttribute('data-card')
    const masCheckbox = document.querySelectorAll(`input[name="mas[${number}]"]`)
    let masChecked = false
    for(let i = 0; i < masCheckbox.length && !masChecked; i++) {
      if(masCheckbox[i].checked) {
        setMasCheckedState([...masCheckedState, masCheckbox[i].value]);
        masChecked = true
      }
    }
    const menosCheckbox = document.querySelectorAll(`input[name="menos[${number}]"]`)
    let menosChecked = false
    for(let i = 0; i < menosCheckbox.length && !menosChecked; i++) {
      if(menosCheckbox[i].checked) {
        setMenosCheckedState([...menosCheckedState, menosCheckbox[i].value]);
        menosChecked = true
      }
    }
    if (masChecked && menosChecked) {
      setCounter((current) => current + 1)
    } else {
      const currentCard = document.querySelector(`#card_${number}`)
      currentCard.classList.add("apply-shake");
    }
  }

  return (
    <>
      <div className={styles.center}>
        <form id="disc_form" method="post">
          {data.map((card, index) =>
          (
            <div key={index} id={`card_${index}`} className={`${styles["disc-card"]} ${counter !== index ? styles["display__none"] : ""}`}>
              <div className={styles["disc-card-header"]}>
                {index + 1}/{data.length}
              </div>
              <div className={styles["disc-card-body"]}>
                <table className={styles["disc-card-table"]}>
                  <thead>
                    <tr>
                      <th className=""></th>
                      <th className={styles.lead}>+</th>
                      <th className={styles.lead}>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fila">
                      <td className={`${styles.item} ${styles.lead}`}>{card.dominante}</td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmas" type="radio" name={`mas[${index}]`} value="D" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmenos" type="radio" name={`menos[${index}]`} value="D" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                    </tr>
                    <tr className="fila">
                      <td className={`${styles.item} ${styles.lead}`}>{card.influyente}</td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmas" type="radio" name={`mas[${index}]`} value="I" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmenos" type="radio" name={`menos[${index}]`} value="I" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                    </tr>
                    <tr className="fila">
                      <td className={`${styles.item} ${styles.lead}`}>{card.estable}</td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmas" type="radio" name={`mas[${index}]`} value="E" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmenos" type="radio" name={`menos[${index}]`} value="E" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                    </tr>
                    <tr className="fila">
                      <td className={`${styles.item} ${styles.lead}`}>{card.conciensudo}</td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmas" type="radio" name={`mas[${index}]`} value="C" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                      <td>
                        <label className={styles["disc-container"]}>
                          <input className="checkmenos" type="radio" name={`menos[${index}]`} value="C" onChange={handleCheck} required />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles["disc-card-footer"]}>
                <button type="button" className="btn btn-warning next-btn" onClick={ nextCard } data-card={index}> 
                  Siguiente 
                </button>
              </div>
            </div>
          ))}
        </form>
        <div id="end-test" className={counter !== data.length ? styles["display__none"] : ""}>
          <input type="submit" id="submit" name="submit" value="Finalizar" className="btn btn-warning w-100" form="disc_form" onClick={ handleSaving } />
        </div>
      </div>
      {isSaving && <LoadingSpinner />}
      <ToastContainer />
    </>
  );
}