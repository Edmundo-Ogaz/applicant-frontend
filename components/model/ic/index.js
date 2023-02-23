import Link from 'next/link'

import styles from "./modal.module.css";

import Certificate from '@/components/test/ic/certificate';

export default function ModalIcCertificate({ id, url, setIsOpen, testPostulant }) {
	console.log('ModalIcCertificate')

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