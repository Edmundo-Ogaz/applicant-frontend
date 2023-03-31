

import DateUtil from '@/utils/DateUtil';

import styles from './certificate.module.css';


export default function Certificate(props) {
  console.log('Certificate')

  const { test, postulant, answer, updatedAt, state } = props

  return (
    <>
      <div className="container">
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
                  <li>Rendido: {DateUtil.parse(updatedAt)} </li>
                  <li>Válido hasta: P/D</li>
                  <li>Estado: {state.name} </li>
                  <li>Lugar de rendición: Online</li>
                  <li>Cod: --- </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}