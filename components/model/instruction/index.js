import Link from 'next/link'

import styles from "./modal.module.css";

import Certificate from '@/components/test/ic/certificate';

export default function ModalInstruction({ testPostulant, setIsOpen }) {
	console.log('ModalInstruction')

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div id="modal" className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
          <div id="url" className={styles.modalContent}>
            {location.protocol}{'//'}{location.host}/public/test/instruction/{testPostulant.id}
          </div>
        </div>
      </div>
    </>
  );
}