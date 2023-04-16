import useTranslation from 'next-translate/useTranslation'

import DateUtil from '@/utils/DateUtil'
import styles from './certificate.module.css'

export default function Head({postulant, company, state, updatedAt}) {
  console.log('Head')

  const { t, lang } = useTranslation('certificateHead')

    return (
        <div className={styles.header}>
          <div id="logo" className={styles.logo}>
            <img src="/images/logo_applicant.jpg" alt="logo" width="125" height="125" />
          </div>
          <div className={styles.personal_info}>
              <div className={styles.info_col}>
                <ul>
                  <li>{t('name')}: {postulant.firstName} {postulant.lastName}</li>
                  <li>{t('run')}: {postulant.rut}</li>
                  <li>{t('age')}: {postulant.age}</li>
                  <li>{t('sex')}: {postulant.sexo}</li>
                </ul>
              </div>
              <div className={styles.info_col}>
                <ul>
                  <li>{t('made')}: {DateUtil.parse(updatedAt)}</li>
                  <li>{t('company')}: {company.name}</li>
                  <li>{t('state')}: {state.name} </li>
                  <li>{t('place-made')}: Online</li>
                </ul>
              </div>
          </div>
        </div>
    )
}