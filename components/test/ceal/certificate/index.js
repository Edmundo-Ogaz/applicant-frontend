import Head from '../../certificate/head';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bubble, Scatter, Bar } from 'react-chartjs-2';

import styles from './certificate.module.css';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function Certificate(props) {
  console.log('Certificate')

  const { test, postulant, company, answer, updatedAt, state } = props

  const dataBubble = {
    datasets: [
      {
        label: ["Separado"],
        pointStyle: 'dirArrow',
        backgroundColor: "rgba(255,221,50,0.2)",
        borderColor: "rgba(255,221,50,1)",
        data: [{
            x: -2,
            y: -2,
            r: (answer.countStyle[3] * 100)/12
        }]
      },
      {
        label: ["Autocrático"],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        data: [{
          x: -2,
          y: 2,
          r: (answer.countStyle[0] * 100)/12
        }]
      },
      {
        label: ["Integrado"],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        data: [{
          x: 2,
          y: 2,
          r: (answer.countStyle[1] * 100)/12
        }]
      },
      {
        label: ["Relacionado"],
        backgroundColor: "rgba(193,46,12,0.2)",
        borderColor: "rgba(193,46,12,1)",
        data: [{
          x: 2,
          y: -2,
          r: (answer.countStyle[2] * 100)/12
        }]
      }
    ]
  }

  const optionsBubble = {
    plugins: {
      tooltip: {
        enabled: false
      },
    },
    scales: {
      x: {
        display: true,
        max: 5,
        min: -5,
        title: {
          display: true,
          text: "Orientado a las personas"
        }
      },
      y: {
        display: true,
        max: 5,
        min: -5,
        title: {
          display: true,
          text: "Orientado a la Tarea"
        }
      }
    }
  }

  const data = {
    datasets: [{
      data: [{
        x: 0,
        y: answer.totalEffectiveness
      }],
      pointRadius: 5,
      backgroundColor: 'rgb(11, 98, 164)'
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        labels: {
          title: {
            font: {
              weight: 'bold'
            }
          }
        },
        formatter: function(value, context) {
          return `Efectividad total: ${value.y}`;
        }
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        max: 24,
        min: -24,
        ticks: {
          stepSize: 12
        }
      }
    }
  }

  const dataBar = {
    labels: ["Autocrático", "Integrado", "Relacionado", "Separado"],
    datasets: [{
      label: 'Seleccionado',
      backgroundColor: 'rgba(255,0,0,0.3)',
              borderColor: 'rgba(255,0,0,1)',
      borderWidth: 1,
      data: answer.countStyle
    }, {
      label: 'Efectividad',
      backgroundColor: 'rgba(0, 255,0,0.3)',
              borderColor: 'rgba(0, 255,0,1)',
      borderWidth: 1,
      data: answer.countEffectiveness
    }],

  };

  const optionsBar = {
    responsive: true,
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Chart.js Bar Chart'
    }
  }

  return (
    <>
      <div className="container">
        <Head postulant={postulant} company={company} updatedAt={updatedAt} state={state} />
        <div className="row">
          <div className="col-md-8" style={{height: "max-content"}}>
            <div className="col" style={{height: "max-content"}}>
              <Bubble data={dataBubble} options={optionsBubble} />
              <div className={styles.tick} style={{position: "absolute", bottom: "0", left: "0"}}>
                  Bajo
              </div>
              <div className={styles.tick} style={{position: "absolute", top: "0", left: "0"}}>
                  Alto
              </div>
              <div className={styles.tick} style={{position: "absolute", bottom: "0", right: "0"}}>
                  Alto
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p className=" text-center">Muy Alta</p>
            <Scatter data={data} options={options} plugins={[ChartDataLabels]} />
            <p className=" text-center">Muy Baja</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Bar data={dataBar} options={optionsBar} />
          </div>
          <div className="col-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td>Estilos</td>
                  <td className=" text-center">Predominio</td>
                  <td className=" text-center">Efectividad</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Autocratico</td>
                  <td className=" text-center">{answer.countStyle[0]}</td>
                  <td className=" text-center">{answer.countEffectiveness[0]}</td>
                </tr>
                <tr>
                  <td>Integrado</td>
                  <td className=" text-center">{answer.countStyle[1]}</td>
                  <td className=" text-center">{answer.countEffectiveness[1]}</td>
                </tr>
                <tr>
                  <td>Relacionado</td>
                  <td className=" text-center">{answer.countStyle[2]}</td>
                  <td className=" text-center">{answer.countEffectiveness[2]}</td>
                </tr>
                <tr>
                  <td>Sepearado</td>
                  <td className=" text-center">{answer.countStyle[3]}</td>
                  <td className=" text-center">{answer.countEffectiveness[3]} </td>
                </tr>
                <tr>
                  <td colSpan="2">Efectividad General</td>
                  <td className=" text-center">{answer.totalEffectiveness}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td className=" text-center align-middle">Ineficaz</td>
                  <td className=" text-center align-middle">Estilo básico</td>
                  <td className=" text-center align-middle">Eficaz</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[0] < 0 ? styles.destacado : ''}`}>
                    Autoritario
                    <br /> 
                    Visto a menudo como alguien que no confía en los demás, es desagradable y se interesa sólo en la producción a corto plazo.
                  </td>
                  <td className=" text-center">1
                    <br /> 
                    Autocratico
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[0] > 0 ? styles.destacado : ''}`}>
                    Autocrata Benevolo
                    <br />
                    Visto a menudo como alguien que sabe lo que desea y que impone sus métodos para lograrlo sin provocar resentimiento.
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[1] < 0 ? styles.destacado : ''}`}>
                    Componedor
                    <br />
                    Visto a menudo como alguien que trata de agradar a todos y, por lo tanto, vacila de un lado a otro para evitar tensiones en una situación.
                  </td>
                  <td className="text-center">
                    2
                    <br />
                    Integrado
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[1] > 0 ? styles.destacado : ''}`}>
                    Ejecutivo
                    <br />
                    Visto a menudo como alguien que es un buen motivador, maneja normas elevadas, trata a cada uno de modo diferente prefiere administrar en equipo.
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[2] < 0 ? styles.destacado : ''}`}>
                    Misionero
                    <br />
                    Visto a menudo como alguien que está primordialmente interesado en la armonía y en ser considerado “buena gente” reticente a arriesgar la ruptura de una relación con tal de cumplir una tarea.
                  </td>
                  <td className="text-center">
                    3
                    <br />
                    Relacionado
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[2] > 0? styles.destacado : ''}`}>
                    Promotor
                    <br />
                    Visto a menudo como alguien que tiene una confianza - implícita en las personas y que se interesa primordialmente en desarrollar sus aptitudes.
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[3] < 0 ? styles.destacado : ''}`}>
                    Desertor
                    <br />
                    Visto a menudo como alguien que no se siente comprometido y es pasivo, y se preocupa poco por la tarea o por las personas que participan en ella.
                  </td>
                  <td className="text-center">
                    4
                    <br />
                    Separado
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[3] > 0 ? styles.destacado : ''}`}>
                    Burócrata
                    <br />
                    Visto a menudo como alguien que permite a sus subordinados decidir convenientemente cómo debe hacerse el trabajo y desempeña un papel menor en su interacción social.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </>
  );
}