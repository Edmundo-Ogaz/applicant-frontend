import Image from 'next/image'

import DateUtil from '@/utils/DateUtil'
import styles from './certificate.module.css'

export default function Head({postulant, company, state, updatedAt}) {

    return (
        <div className={styles.header}>
          <div id="logo" className={styles.logo}>
            <img src="/images/logo_applicant.jpg" alt="logo" width="125" height="125" />
            {/* <Image src="/images/logo_applicant.jpg" alt="logo" width="125" height="125" /> */}
          </div>
          <div className={styles.personal_info}>
              <div className={styles.info_col}>
                <ul>
                  <li>Nombre: {postulant.firstName} {postulant.lastName}</li>
                  <li>RUN: {postulant.rut}</li>
                  <li>Edad: {postulant.age}</li>
                  <li>Sexo: {postulant.sexo}</li>
                </ul>
              </div>
              <div className={styles.info_col}>
                <ul>
                  <li>Rendido: {DateUtil.parse(updatedAt)}</li>
                  <li>Empresa: {company.name}</li>
                  <li>Estado: {state.name} </li>
                  <li>Lugar de rendición: Online</li>
                </ul>
              </div>
          </div>
        </div>
    )
}