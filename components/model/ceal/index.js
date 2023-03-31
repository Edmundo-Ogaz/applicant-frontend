import Link from 'next/link'

import styles from "./modal.module.css";

import Certificate from '@/components/test/ceal/certificate';

export default function ModalCealCertificate({ id, url, setIsOpen, testPostulant }) {
	console.log('ModalCealCertificate')

  const { test, postulant, answer, updatedAt, state } = { ...testPostulant }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
          <Certificate test={test} postulant={postulant} answer={answer} updatedAt={updatedAt} state={state}/>
        </div>
      </div>
    </>
  );
}