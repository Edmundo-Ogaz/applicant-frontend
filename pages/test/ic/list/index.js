import Head from "next/head";
import Link from 'next/link'

import Layout from "../../../../components/layout";

export default function List({answers}) {
	console.log('List')

  return (
    <>
      <Head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://connect4-one.vercel.app/views/css/style.css"
        />
      </Head>
    
      <Layout>
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
                    <div className="description">
                        <p style={{paddingLeft: '1rem'}}>Test diseñado para medir la eficiencia en el trabajo bajo presión, la reacción ante instrucciones complejas y la tolerancia a la frustración. Se evalua entre 1 y 6 puntos, obteniendo mayor puntaje en cuanto muestre mejor desempeño ante los retos enfrentados.</p>
                    </div>
                    <div id="info_inf">
                        <div className="full_container" id="scores">
                                <table>
                                  <thead>
                                    <tr>
                                        <th>Puntaje</th>
                                        <th>Nivel</th>
                                        <th className="scores__cell-7w">Descripción</th>
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
            </div>
            <div id="test">
                <div id="test_cont">
                        <table>
                          <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    NIVEL
                                </th>
                                <th>
                                    BUENAS
                                </th>
                                <th>
                                    MALAS
                                </th>
                                <th>
                                    OMITIDAS
                                </th>
                                <th>
                                    FECHA
                                </th>
                                <th>
                                    ESTADO
                                </th>
                            </tr>
                          </thead>
                          <tbody>
                            {answers.map((answer) => {
                              return (<tr key={answer.id}>
                                  <td>
                                      <Link
                                        href={{
                                          pathname: `/test/ic/certificate/${answer.id}`,
                                        }}
                                      >
                                        { answer.id }
                                      </Link>
                                  </td>
                                  <td>{ answer.score }</td>
                                  <td>{ answer.correct }</td>
                                  <td>{ answer.wrong }</td>
                                  <td>{ answer.omitted }</td>
                                  <td>{ answer.answerDate['@ts'] }</td>
                                  <td>{ answer.state }</td>
                              </tr>)
                            })}
                          </tbody>
                        </table>
                </div>
            </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps');
  const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/ic`
    console.log('getServerSideProps', URL);
    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    console.log('getServerSideProps', testsPortulants);
    return {
      props: {
        answers: testsPortulants,
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