import Head from "next/head";
import { useState } from 'react';

export default function IC({id}) {
	console.log('Instruction')

  const [ loading, setLoading ] = useState();
  const [ error, setError ] = useState();

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
      <Head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://edmundoogaz.pythonanywhere.com/static/IC/style.css"
        />
      </Head>
      <div id="time_alert">
        Prepárate, quedan 2 minutos
      </div>

      <div id="content">
        <div id="sidebar">
          <div id="sidebar-instructions">
            <h1>
              <ul>
                TEST IC
              </ul>
            </h1>
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
            <div id="clock">
              <p>Minutes: <span className="minutes"></span><br/>Seconds: <span className="seconds"></span></p>
            </div>
            <div style={{textAlign: 'center'}}>
              <button 
                  className="btn btn-warning w-75"
                  style={{margin: '0 auto'}}
                  onClick={ handleSaving } 
                  disabled={ loading }>
                  {loading ? 'Saveing...' : 'ENVIAR RESPUESTAS'}
                </button>
            </div>
          </div>
        </div>
        <div id="test">
            <div id="test_cont">
                <form action="{% url 'IC:save' test.id %}" method="post" id="myForm" >
                    <table>
                      <thead>
                        <tr>
                          <th >
                            CANTIDAD ASEGURADA
                          </th>
                          <th >
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
                        <tr>
                          <td>300.000 pesos</td>
                          <td>Incendios</td>
                          <td>02/ene./76</td>
                          <td>
                            <label className="disc-container">
                              <input type="checkbox" id="checkItem" name="check[]" value="0" onChange={handleCheck}/>
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>
                            <label className="disc-container">
                              <input type="checkbox" id="checkItem" name="check[]" value="25" onChange={handleCheck}/>
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>
                            <label className="disc-container">
                              <input type="checkbox" id="checkItem" name="check[]" value="50" onChange={handleCheck}/>
                              <span className="checkmark"></span>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </form>
            </div>
        </div>
      </div>
    </>
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