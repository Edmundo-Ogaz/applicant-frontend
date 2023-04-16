import useTranslation from 'next-translate/useTranslation'

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

  const { t, lang } = useTranslation('certificateCeal')

  const { test, postulant, company, answer, updatedAt, state } = props

  const dataBubble = {
    datasets: [
      {
        label: [t('separado')],
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
        label: [t('autocratico')],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        data: [{
          x: -2,
          y: 2,
          r: (answer.countStyle[0] * 100)/12
        }]
      },
      {
        label: [t('integrado')],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        data: [{
          x: 2,
          y: 2,
          r: (answer.countStyle[1] * 100)/12
        }]
      },
      {
        label: [t('relacionado')],
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
          text: t('orientado-personas')
        }
      },
      y: {
        display: true,
        max: 5,
        min: -5,
        title: {
          display: true,
          text: t('orientado-tarea')
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
          return `${t('efectividad-total')}: ${value.y}`;
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
    labels: [t('autocratico'), t('integrado'), t('relacionado'), t('separado')],
    datasets: [{
      label: t('seleccionado'),
      backgroundColor: 'rgba(255,0,0,0.3)',
              borderColor: 'rgba(255,0,0,1)',
      borderWidth: 1,
      data: answer.countStyle
    }, {
      label: t('efectividad'),
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
                  {t('bajo')}
              </div>
              <div className={styles.tick} style={{position: "absolute", top: "0", left: "0"}}>
                  {t('alto')}
              </div>
              <div className={styles.tick} style={{position: "absolute", bottom: "0", right: "0"}}>
                {t('alto')}
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
                  <td>{t('estilos')}</td>
                  <td className=" text-center">{t('predominio')}</td>
                  <td className=" text-center">{t('efectividad')}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('autocratico')}</td>
                  <td className=" text-center">{answer.countStyle[0]}</td>
                  <td className=" text-center">{answer.countEffectiveness[0]}</td>
                </tr>
                <tr>
                  <td>{t('integrado')}</td>
                  <td className=" text-center">{answer.countStyle[1]}</td>
                  <td className=" text-center">{answer.countEffectiveness[1]}</td>
                </tr>
                <tr>
                  <td>{t('relacionado')}</td>
                  <td className=" text-center">{answer.countStyle[2]}</td>
                  <td className=" text-center">{answer.countEffectiveness[2]}</td>
                </tr>
                <tr>
                  <td>{t('separado')}</td>
                  <td className=" text-center">{answer.countStyle[3]}</td>
                  <td className=" text-center">{answer.countEffectiveness[3]} </td>
                </tr>
                <tr>
                  <td colSpan="2">{t('efectividad-general')}</td>
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
                  <td className=" text-center align-middle">{t('ineficaz')}</td>
                  <td className=" text-center align-middle">{t('estilo-basico')}</td>
                  <td className=" text-center align-middle">{t('eficaz')}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[0] < 0 ? styles.destacado : ''}`}>
                    {t('autoritario')}
                    <br /> 
                    {t('autoritario-msg')}
                  </td>
                  <td className=" text-center">
                    1
                    <br /> 
                    {t('autocratico')}
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[0] > 0 ? styles.destacado : ''}`}>
                    {t('autocrata-benevolo')}
                    <br />
                    {t('autocrata-benevolo-msg')}
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[1] < 0 ? styles.destacado : ''}`}>
                    {t('componedor')}
                    <br />
                    {t('componedor-msg')}
                  </td>
                  <td className="text-center">
                    2
                    <br />
                    {t('integrado')}
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[1] > 0 ? styles.destacado : ''}`}>
                    {t('ejecutivo')}
                    <br />
                    {t('ejecutivo-msg')}
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[2] < 0 ? styles.destacado : ''}`}>
                    {t('misionero')}
                    <br />
                    {t('misionero-msg')}
                  </td>
                  <td className="text-center">
                    3
                    <br />
                    {t('relacionado')}
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[2] > 0? styles.destacado : ''}`}>
                    {t('promotor')}
                    <br />
                    {t('promotor-msg')}
                  </td>
                </tr>
                <tr>
                  <td className={`text-justify ${answer.countEffectiveness[3] < 0 ? styles.destacado : ''}`}>
                    {t('desertor')}
                    <br />
                    {t('desertor-msg')}
                  </td>
                  <td className="text-center">
                    4
                    <br />
                    {t('separado')}
                  </td>
                  <td className={`text-justify ${answer.countEffectiveness[3] > 0 ? styles.destacado : ''}`}>
                    {t('burocrata')}
                    <br />
                    {t('burocrata-msg')}
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