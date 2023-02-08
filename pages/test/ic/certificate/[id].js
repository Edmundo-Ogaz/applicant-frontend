import Head from "next/head";

export default function Certificate({ test, postulant, answer, date, state }) {
	console.log('Certificate')

  return (
    <>
    <div className="horizontal">
      <div id="certificate-body">
        <div id="info_sup" className="horizontal">
            <div id="logo" className="full_center">
                <a>Aquí va un logo</a>
            </div>
            <div id="personal_info" className="full_center">
                <div className="full_container full_center">
                    <div className="info_col vertical">
                        <ul className="data">
                            <li>Nombre: {postulant.firstName} {postulant.lastName}</li>
                            <li>RUN: {postulant.rut}</li>
                            <li>Edad: {postulant.age}</li>
                            <li>Sexo: {postulant.sexo}</li>
                            <li>Ciudad: P/D</li>
                        </ul>
                    </div>
                    <div className="info_col vertical">
                        <ul className="data">
                            <li>Rendido: {date['@ts']} </li>
                            <li>Válido hasta: P/D</li>
                            <li>Estado: {state.name} </li>
                            <li>Lugar de rendición: Online</li>
                            <li>Cod: --- </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="graph_cont">
            <canvas id="scoreGraph" className="mid-floater" aria-label="Ariagraph" role="img"></canvas>
            <div className="pseudo-mid-floater">
                <div id="puntaje" >
                    <div className="bignum" style={{textAlign: 'center'}}>
                        {answer.score}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {answer.level}
                    </div>
                </div>
                <div>
                <table>
                  <tbody>
                    <tr>
                        <td className="middle">Buenas</td>
                        <td> {answer.correct} </td>
                    </tr>
                    <tr>
                        <td className="middle">Malas</td>
                        <td> {answer.wrong} </td>
                    </tr>
                    <tr>
                        <td className="middle">Omitidas</td>
                        <td> {answer.omitted} </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </div>
            <div className="bottom-floater">
                TEST IC <br/> Test diseñado para medir la eficiencia en el trabajo bajo presión, la reacción ante instrucciones complejas y la tolerancia a la frustración. Se evalua entre 1 y 6 puntos, obteniendo mayor puntaje en cuanto muestre mejor desempeño ante los retos enfrentados.
            </div>
        </div>

        <div id="info_inf">
            <div className="full_container" id="puntajes">
                    <table>
                      <thead>
                        <tr>
                            <th>Puntaje</th>
                            <th>Nivel</th>
                            <th className="bigth">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td className="middle">1</td>
                            <td className="middle">Bajo</td>
                            <td>Dificultad de comprensión de instrucciones elevada, o poco manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">2</td>
                            <td className="middle">Medio Bajo</td>
                            <td>Dificultad de comprensión de instrucciones moderada, o poco manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">3</td>
                            <td className="middle">Medio</td>
                            <td>Presenta problemas leves de comprensión de instrucciones o manejo de presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">4</td>
                            <td className="middle">Medio Alto</td>
                            <td>Muestra comprensión de instrucciones y manejo de presión moderado.</td>
                        </tr>
                        <tr>
                            <td className="middle">5</td>
                            <td className="middle">Alto</td>
                            <td>Maneja instrucciones complejas con eficiencia y mantiene el control bajo presión.</td>
                        </tr>
                        <tr>
                            <td className="middle">6</td>
                            <td className="middle">Muy Alto</td>
                            <td>Maneja instrucciones complejas sin difucultades y mantiene el control bajo presión.</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
        </div>
      </div>
      <div className='fixed btnDwn'>
          <a href='#'><i className="fas fa-file-download"></i></a>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps');
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`
    console.log('getServerSideProps', URL);
    const testPortulant = await fetch(URL)
    .then(testPortulant => testPortulant.json())
    console.log('getServerSideProps', testPortulant);
    const { test, postulant, answer, date, state} = {...testPortulant}
    return { 
      props: { test, postulant, answer, date, state }
    } 
  } catch(e) {
    console.error(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}