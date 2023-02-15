import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import styles from './certificate.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Certificate(props) {
  console.log('Certificate')

  const { test, postulant, answer, date, state } = props

  const score = answer.score
  let level_background = [0, 0, 0, 0, 0, 0];
  let level_labels = ["", "", "", "", "", ""];
  let level_data = [0, 0, 0, 0, 0, 0];
  for (let i = 1; i <= 6; i++) {
    let level = "";
    switch (i) {
      case 1:
        level = "Bajo";
        level_background[i - 1] = "rgb(130, 130, 130)";
        break;
      case 2:
        level = "Medio Bajo";
        level_background[i - 1] = "rgb(150, 150, 150)";
        break;
      case 3:
        level = "Medio";
        level_background[i - 1] = "rgb(170, 170, 170)";
        break;
      case 4:
        level = "Medio Alto";
        level_background[i - 1] = "rgb(190, 190, 190)";
        break;
      case 5:
        level = "Alto";
        level_background[i - 1] = "rgb(210, 210, 210)";
        break;
      case 6:
        level = "Muy Alto";
        level_background[i - 1] = "rgb(230, 230, 230)";
        break;
    }
    console.log(i === score);
    if (i < score) {
      level_labels[i - 1] = level;
      level_data[i - 1] = "";
    }
    else if (i === score) {
      level_labels[i - 1] = "Tu nivel: ".concat(level);
      level_background[i - 1] = "rgb(255, 166, 0)";
      level_data[i - 1] = score;
    }
    else {
      level_labels[i - 1] = level;
      level_data[i - 1] = 1;
    }
    console.log(i);
    console.log(level_labels);
  }

  const data = {
    labels: level_labels,
    datasets: [{
      backgroundColor: level_background,
      borderAlignment: 'inner',
      data: level_data,
    },
    {
      data: [1, 1, 1, 1, 1, 1],
      borderAlignment: 'inner',
      backgroundColor: [
        'rgb(150, 150, 150)',
        'rgb(160, 160, 160)',
        'rgb(170, 170, 170)',
        'rgb(180, 180, 180)',
        'rgb(190, 190, 190)',
        'rgb(200, 200, 200)',
      ]
    }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      }
    }
  }

  async function generatePDF() {
    const canvas = await html2canvas(document.querySelector("#certificate"));
    const image = canvas.toDataURL("image/png", 1.0);
    var doc = new jsPDF('p', 'in', 'letter', false, false, 5000);
    doc.addImage(image, 'JPEG', 0, 0, 8.5, 11);
    doc.save('test.pdf')
  }

  return (
    <>
      <div className={styles.main}>
        <div id="certificate" className={styles.container}>
          <div className={styles.header}>
            <div id="logo" className={styles.logo}>
              <a>Aquí va un logo</a>
            </div>
            <div className={styles.personal_info}>
                <div className={styles.info_col}>
                  <ul>
                    <li>Nombre: {postulant.firstName} {postulant.lastName}</li>
                    <li>RUN: {postulant.rut}</li>
                    <li>Edad: {postulant.age}</li>
                    <li>Sexo: {postulant.sexo}</li>
                    <li>Ciudad: P/D</li>
                  </ul>
                </div>
                <div className={styles.info_col}>
                  <ul>
                    <li>Rendido: {date['@ts']} </li>
                    <li>Válido hasta: P/D</li>
                    <li>Estado: {state.name} </li>
                    <li>Lugar de rendición: Online</li>
                    <li>Cod: --- </li>
                  </ul>
                </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.graph}>
              <Doughnut data={data} options={options} />
            </div>
            <div className={styles.score}>
              <div className={styles.score__number}>
                {answer.score}
              </div>
              <div>
                {answer.level}
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td className={styles.border}>Buenas</td>
                      <td className={styles.border}> {answer.correct} </td>
                    </tr>
                    <tr>
                      <td className={styles.border}>Malas</td>
                      <td className={styles.border}> {answer.wrong} </td>
                    </tr>
                    <tr>
                      <td className={styles.border}>Omitidas</td>
                      <td className={styles.border}> {answer.omitted} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.description}>
              TEST IC <br /> Test diseñado para medir la eficiencia en el trabajo bajo presión, la reacción ante instrucciones complejas y la tolerancia a la frustración. Se evalua entre 1 y 6 puntos, obteniendo mayor puntaje en cuanto muestre mejor desempeño ante los retos enfrentados.
            </div>
          </div>
            <div className={styles.scores}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.border}>Puntaje</th>
                    <th className={styles.border}>Nivel</th>
                    <th className={`${styles['scores__cell-7w']} ${styles.border}`}>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.highlight}>
                    <td className={`${styles.middle} ${styles.border}`}>1</td>
                    <td className={`${styles.middle} ${styles.border}`}>Bajo</td>
                    <td className={styles.border}>Dificultad de comprensión de instrucciones elevada, o poco manejo de presión.</td>
                  </tr>
                  <tr>
                    <td className={`${styles.middle} ${styles.border}`}>2</td>
                    <td className={`${styles.middle} ${styles.border}`}>Medio Bajo</td>
                    <td className={styles.border}>Dificultad de comprensión de instrucciones moderada, o poco manejo de presión.</td>
                  </tr>
                  <tr>
                    <td className={`${styles.middle} ${styles.border}`}>3</td>
                    <td className={`${styles.middle} ${styles.border}`}>Medio</td>
                    <td className={styles.border}>Presenta problemas leves de comprensión de instrucciones o manejo de presión.</td>
                  </tr>
                  <tr>
                    <td className={`${styles.middle} ${styles.border}`}>4</td>
                    <td className={`${styles.middle} ${styles.border}`}>Medio Alto</td>
                    <td className={styles.border}>Muestra comprensión de instrucciones y manejo de presión moderado.</td>
                  </tr>
                  <tr>
                    <td className={`${styles.middle} ${styles.border}`}>5</td>
                    <td className={`${styles.middle} ${styles.border}`}>Alto</td>
                    <td className={styles.border}>Maneja instrucciones complejas con eficiencia y mantiene el control bajo presión.</td>
                  </tr>
                  <tr>
                    <td className={`${styles.middle} ${styles.border}`}>6</td>
                    <td className={`${styles.middle} ${styles.border}`}>Muy Alto</td>
                    <td className={styles.border}>Maneja instrucciones complejas sin difucultades y mantiene el control bajo presión.</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        <button className={styles[`button-pdf`]} onClick={generatePDF}>
        <svg
          className={styles['icon__dowload-pdf']}
          fill="#ffc107"
          width="75"
          height="75"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 122.88">
          <title>download-file-round</title>
          <path fillRule="evenodd" d="M61.44,0A61.44,61.44,0,1,1,0,61.44,61.44,61.44,0,0,1,61.44,0Zm10.9,49.72a3.63,3.63,0,1,1,5.09,5.18L63.63,68.53a3.64,3.64,0,0,1-5.1,0L44.93,55.1A3.63,3.63,0,0,1,50,49.91l7.49,7.42.08-26.13a3.64,3.64,0,0,1,7.27.06l-.08,25.93,7.56-7.47ZM32.5,83.09l0-14.22a3.64,3.64,0,0,1,7.27.07l0,10.35q21.66,0,43.3,0l0-10.42a3.64,3.64,0,1,1,7.27.07l0,14.15h0a3.64,3.64,0,0,1-3.6,3.47q-25.32,0-50.59,0a3.63,3.63,0,0,1-3.6-3.47Z"/>
        </svg>
        </button>
        </div>
    </>
  );
}