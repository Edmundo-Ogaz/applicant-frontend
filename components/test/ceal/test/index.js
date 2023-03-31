import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingSpinner from '@/components/LoadingSpinner/index.js';

import styles from './ceal.module.css';

import data from './data.json'

export default function CEAL(props) {
  console.log('CEAL')

  const { id, url } = props;

  const requestRef = useRef()
  const previousTimeRef = useRef()

  const router = useRouter()

  const [ isSaving, setIsSaving ] = useState(false)

  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    // console.log('useEffect')
    const boxes = document.querySelectorAll(".box");
  
    function getIntersectionRatio(i) {
      // console.log('getIntersectionRatio')
      const a = [window.scrollY, window.scrollY + window.innerHeight];
      const b = [boxes[i].offsetTop, boxes[i].offsetTop + boxes[i].clientHeight];
  
      const max = Math.max(a[0], b[0]);
      const min = Math.min(a[1], b[1]);
  
      return Math.max(0, (min - max) / (b[1] - b[0]));
    }

    function onScroll() {
      // console.log('onScroll')
      const boxes = document.querySelectorAll(".box");
      for (let i = 0; i < boxes.length; i += 1) {
        const intersection = getIntersectionRatio(i);
        const top = boxes[i].offsetTop - window.pageYOffset < 0;
        boxes[i].firstChild.style.cssText = `
          transform-origin: ${top ? "center center" : "top center"};
          position: ${top ? "fixed" : "absolute"};
          transform: scale(${intersection});
          opacity: ${intersection};
        `;
      }
      requestRef.current = requestAnimationFrame(onScroll);
    }

    requestRef.current = requestAnimationFrame(onScroll);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
    
    // const animate = time => {
    //   if (previousTimeRef.current != undefined) {
    //     const deltaTime = time - previousTimeRef.current;
    //     setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
    //   }
    //   previousTimeRef.current = time;
    //   requestRef.current = requestAnimationFrame(animate);
    // }
    
    // useEffect(() => {
    //   requestRef.current = requestAnimationFrame(animate);
    //   return () => cancelAnimationFrame(requestRef.current);
    // }, []);

    const handleSaving = async (e) => {
      try {
        console.log('handleSave')
        e?.preventDefault()
          setIsSaving(true)
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/ceal/${id}`, 
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
          router.push(url)
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
        updatedList = [...checkedState, parseInt(event.target.value)];
      } else {
        updatedList.splice(checkedState.indexOf(parseInt(event.target.value)), 1);
      }
      setCheckedState(updatedList);
      console.log(updatedList)
    };

  return (
    <>
      <form id="ceal_form" method="post">
        <div className="questionary">
          {data.map((question, index) =>
            (<div key={index} className={`box ${styles.box}`}>
              <div>
                <div className={styles.content}>
                  <div className={styles.questions}>
                    <div className="row">
                      <div className="col-1" style={{textAlign: "center"}}>
                        {question.id}
                      </div>
                      <div className="col">
                        {question.question}
                      </div>
                    </div>
                  </div>
                  <div className={styles.answers}>
                    {question.alternatives.map((answer, index) =>
                      (<div key={index} className={styles.answer}>
                        <div className="row">
                          <div className="col-1">
                            <label className={styles.check}>
                              <input type="radio" id={question.id} name={question.id} value={answer.id_alternativa} onChange={handleCheck} required />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                          <div className="col-11">
                            {answer.respuesta}
                          </div>
                        </div>
                      </div>)
                    )}
                  </div>
                </div>
              </div>
            </div>)
          )}
        </div>
        <div className={styles.endTest}>
          <button
            className="btn btn-warning"
            onClick={ handleSaving } 
            disabled={ isSaving }>
            {isSaving ? 'Saving...' : 'Finalizar Test'}
          </button>
        </div>
      </form>
      {isSaving && <LoadingSpinner/>}
      <ToastContainer />
    </>
  );
}