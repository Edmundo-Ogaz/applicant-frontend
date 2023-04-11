import styles from "./modal.module.css";

export default function ModalLink({ link, setIsOpen }) {
	console.log('ModalLink')

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div id="modal" className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
          <div id="url" className={styles.modalContent}>
            {location.protocol}{'//'}{location.host}{link}
          </div>
        </div>
      </div>
    </>
  );
}