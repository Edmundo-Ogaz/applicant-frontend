import Link from 'next/link'

import styles from "./modal.module.css";

import Certificate from '@/components/test/ic/certificate';

export default function ModalIcCertificate({ id, type, setIsOpen }) {
	console.log('ModalIcCertificate')

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
          <div className={styles.modalContent}>
            {location.protocol}{'//'}{location.host}/public/test/{type}/instruction/{id}
          </div>
        </div>
      </div>
    </>
  );
}