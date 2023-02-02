import { useState } from 'react';
import styles from './ic.module.css';

export default function IC({id}) {
	console.log('Instruction')

  const [ loading, setLoading ] = useState();
  const [ error, setError ] = useState();

  // const [checkedState, setCheckedState] = useState(new Array(75).fill(false));
  const [checkedState, setCheckedState] = useState([]);

  const handleSaving = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/ic/${id}`, 
      {
        method: 'PATCH',
        body: JSON.stringify({checks: checkedState}),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch(e => {
      console.error(e)
      setError(e.message)
    }) 
	};

  // const handleCheck = (event) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === event.target.value ? !item : item
  //   );

  //   setCheckedState(updatedCheckedState);
  // };

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
    <div className={styles.ic}>
      <div id="time_alert" className={styles['ic__time-alert']}>
        Prepárate, quedan 2 minutos
      </div>
      <div id="content" className={styles.ic__content}>
        <div id="sidebar" className={styles['ic__side-bar']}>
          <div id="sidebar-instructions" className={styles['ic__side-bar__instructions']}>
              <h1 style={{textAlign: 'center'}} >
                  TEST IC
              </h1>
              <hr/>
              <ol style={{width: '90%', textAlign: 'justify'}}>
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
              <div id="clock" className={styles.ic__clock}>
                  <p>Minutes: <span className="minutes"></span><br/>Seconds: <span className="seconds"></span></p>
              </div>

              <div style={{textAlign: 'center'}}>
                {/* <input type="submit" id="submiter" name="submiter" value="ENVIAR RESPUESTAS" className={[styles.ic__button, styles['ic__button--lg'], styles['ic__button--warning']].join(" ")} /> */}
                <button 
                  className={[styles.ic__button, styles['ic__button--lg'], styles['ic__button--warning']].join(" ")} 
                  onClick={ handleSaving } 
                  disabled={ loading }>
                  {loading ? 'Saveing...' : 'ENVIAR RESPUESTAS'}
                </button>
              </div>

            </div>
        </div>
        <div id="test" className={styles.ic__test}>
          <div id="test_cont" className={styles.ic__cont}>
            <form action="" method="post" id="myForm">
              <table className={styles.ic__table}>
                <thead>
                  <tr>
                    <th className={styles.ic__th}>
                    CANTIDAD ASEGURADA
                    </th>
                    <th className={styles.ic__th}>
                    CLASES DE SEGURO
                    </th>
                    <th className={styles.ic__th}>
                    FECHA
                    </th>
                    <th className={styles.ic__th}>
                    1
                    </th>
                    <th className={styles.ic__th}>
                    2
                    </th>
                    <th className={styles.ic__th}>
                    3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>300.000 pesos</td>
                    <td>Incendios</td>
                    <td>02/ene./76</td>
                    <td>
                      <label className={styles['ic__disc-container']}>
                          <input type="checkbox" id="checkItem" name="check[]" value="0" onChange={handleCheck}/>
                          <span className={styles.ic__checkmark}></span>
                      </label>
                    </td>
                    <td>
                      <label className={styles['ic__disc-container']}>
                          <input type="checkbox" id="checkItem" name="check[]" value="25" onChange={handleCheck}/>
                          <span className={styles.ic__checkmark}></span>
                      </label>
                    </td>
                    <td>
                      <label className={styles['ic__disc-container']}>
                          <input type="checkbox" id="checkItem" name="check[]" value="50" onChange={handleCheck}/>
                          <span className={styles.ic__checkmark}></span>
                      </label>
                    </td>
                  </tr>
                    <tr>
                            <td>100.000 pesos</td>
                            <td>Vida</td>
                            <td>22/oct./75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="1" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="26" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="51" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>400.000 pesos</td>
                            <td>Accidentes</td>
                            <td>14/sep/75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="2" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="27" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="52" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>200.000 pesos</td>
                            <td>Vida</td>
                            <td>13/nov./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="3" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="28" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="53" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>400.000 pesos</td>
                            <td>Incendios</td>
                            <td>17/may./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="4" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="29" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="54" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>300.000 pesos</td>
                            <td>Accidentes</td>
                            <td>12/oct./75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="5" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="30" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="55" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>500.000 pesos</td>
                            <td>Vida</td>
                            <td>16/feb./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="6" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="31" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="56" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>100.000 pesos</td>
                            <td>Incendios</td>
                            <td>03/ago./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="7" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="32" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="57" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>400.000 pesos</td>
                            <td>Incendios</td>
                            <td>11/ago./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="8" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="33" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="58" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>200.000 pesos</td>
                            <td>Accidentes</td>
                            <td>21/may./75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="9" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="34" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="59" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>500.000 pesos</td>
                            <td>Vida</td>
                            <td>09/mar./75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="10" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="35" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="60" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>300.000 pesos</td>
                            <td>Incendios</td>
                            <td>17/jul./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="11" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="36" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="61" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>100.000 pesos</td>
                            <td>Accidentes</td>
                            <td>04/jun./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="12" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="37" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="62" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>100.000 pesos</td>
                            <td>Vida</td>
                            <td>23/nov./76</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="13" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="38" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="63" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                    <tr>
                            <td>500.000 pesos</td>
                            <td>Vida</td>
                            <td>18/abr./75</td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="14" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="39" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="64" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                    </tr>
                
                    <tr>
                        
                            <td>200.000 pesos</td>
                        
                            <td>Accidentes</td>
                        
                            <td>24/dic./76</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="15" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="40" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="65" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>500.000 pesos</td>
                        
                            <td>Accidentes</td>
                        
                            <td>19/abr./75</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="16" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="41" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="66" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>200.000 pesos</td>
                        
                            <td>Vida</td>
                        
                            <td>07/dic./76</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="17" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="42" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="67" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>400.000 pesos</td>
                        
                            <td>Incendios</td>
                        
                            <td>25/may./75</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="18" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="43" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="68" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>300.000 pesos</td>
                        
                            <td>Accidentes</td>
                        
                            <td>06/ene./76</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="19" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="44" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="69" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>500.000 pesos</td>
                        
                            <td>Vida</td>
                        
                            <td>29/mar./75</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="20" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="45" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="70" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>300.000 pesos</td>
                        
                            <td>Vida</td>
                        
                            <td>28/jun./75</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="21" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="46" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="71" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>400.000 pesos</td>
                        
                            <td>Accidentes</td>
                        
                            <td>08/feb./76</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="22" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="47" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="72" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>100.000 pesos</td>
                        
                            <td>Incendios</td>
                        
                            <td>27/jul./75</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="23" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="48" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="73" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                    </tr>
                
                    <tr>
                        
                            <td>200.000 pesos</td>
                        
                            <td>Accidentes</td>
                        
                            <td>21/ene./76</td>
                        
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="24" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="49" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>
                        
                            <td>
                            <label className={styles['ic__disc-container']}>
                                <input type="checkbox" id="checkItem" name="check[]" value="74" onChange={handleCheck}/>
                                <span className={styles.ic__checkmark}></span>
                            </label>
                            </td>  
                    </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({query}) {
  try {
    console.log('getServerSideProps',query.postulant, query.company);
    if (isNaN(query.postulant) || isNaN(query.company)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests-postulants?postulant=${query.postulant}&company=${query.company}&state=${process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID}`
    console.log('getServerSideProps', URL);

    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    if (!Array.isArray(testsPortulants) || testsPortulants.length !== 1) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    return {
      props: {
        id: testsPortulants[0].id,
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