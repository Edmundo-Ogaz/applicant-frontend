import Link from 'next/link'

import styles from "./modal.module.css";

import Certificate from '@/components/test/disc/certificate';

export default function ModalDiscCertificate({ id, url, setIsOpen, testPostulant }) {
	console.log('ModalDiscCertificate')

  const { test, postulant, answer, date, state, profile } = { ...testPostulant }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
          <Certificate test={test} postulant={postulant} answer={answer} date={date} state={state} profile={profile} />
        </div>
      </div>
    </>
  );
}