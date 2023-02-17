import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from './certificate.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Certificate({ test, postulant, answer, date, state, profile }) {
  console.log('Certificate')

  const data = {
    labels: [
      'D',
      'I',
      'S',
      'C'
    ],
    datasets: [{
      label: '',
      backgroundColor: [
          'rgb(130, 130, 0)',
          'rgb(150, 0, 150)',
          'rgb(0, 170, 170)',
          'rgb(190, 0, 0)'
          ],
      data: [
        answer.D,
        answer.I,
        answer.S,
        answer.C
      ]
    }]
  };

  return (
    <>
      <div className="container-fluid">
        <div className="w-75" style={{margin: '0 auto'}}>
          <div className="jumbotron shadow p-3 mb-5 bg-white rounded" style={{marginTop:'2rem'}}>
            <h1 className="display-4">{profile.profile}</h1>
            <hr className="my-4" />
            <div className="row">
              <div className="col-4">
                <div className={`text-center ${styles["img-perfil"]}`}>
                  <img src={profile.image} className="rounded img-fluid" alt="..." />
                </div>
              </div>
              <div className="col-8">
                <dl className="row">
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Emociones:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.emocion}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Juzga a los demás por:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.juicio}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Influye en los demás mediante:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.influencia}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Su valor para la organización:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.valor}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Abusa de:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.abuso}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Bajo presión:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.presion}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Teme:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.temor}
                    </p>
                  </dd>
                  <dt className="col-4">
                    <p className="lead font-italic">
                      Sería más eficaz si:
                    </p>
                  </dt>
                  <dd className="col-8">
                    <p className="lead">
                      {profile.eficacia}
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row justify-content-md-center">
              <div className="w-75">
                <p className="lead text-justify">
                  Descripción:
                </p>
                <p className="text-justify">
                  {profile.description}
                </p>
              </div>
            </div>
            <div className="row justify-content-md-center" style={{margin: '1.7rem', marginBottom: '5rem'}}>
              <Bar data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}