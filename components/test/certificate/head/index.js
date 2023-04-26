import useTranslation from 'next-translate/useTranslation'

import DateUtil from '@/utils/DateUtil'
import styles from './certificate.module.css'

export default function Head({postulant, company, state, updatedAt}) {

  const { t, lang } = useTranslation('common')

  return (
    <div className={styles.header}>
      <div id="logo" className={styles.logo}>
        <img src="/images/logo_applicant.jpg" alt="logo" width="125" height="125" />
      </div>
      <div className={styles.personal_info}>
          <div className={styles.info_col}>
            <ul>
              <li>{t('certificate.head.name')}: {postulant.firstName} {postulant.lastName}</li>
              <li>{t('certificate.head.run')}: {postulant.rut}</li>
              <li>{t('certificate.head.age')}: {DateUtil.birthdayToEge(postulant.birthday)}</li>
              <li>{t('certificate.head.sex')}: {postulant.sexo}</li>
            </ul>
          </div>
          <div className={styles.info_col}>
            <ul>
              <li>{t('certificate.head.made')}: {DateUtil.parse(updatedAt)}</li>
              <li>{t('certificate.head.company')}: {company.name}</li>
              <li>{t('certificate.head.state')}: {state.name} </li>
              <li>{t('certificate.head.place_made')}: Online</li>
            </ul>
          </div>
      </div>
    </div>
  )
}