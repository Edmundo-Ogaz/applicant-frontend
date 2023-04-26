import IcCertificate from '@/components/test/ic/certificate';
import DiscCertificate from '@/components/test/disc/certificate';
import CealCertificate from '@/components/test/ceal/certificate';

import styles from "./modal.module.css";

export default function ModalCertificate({ id, url, setIsOpen, testPostulant }) {
	console.log('ModalCertificate')

  const { test, postulant, company, answer, updatedAt, state, profile } = { ...testPostulant }

  const Certificates = []
  Certificates[process.env.NEXT_PUBLIC_TEST_IC_ID] = IcCertificate
  Certificates[process.env.NEXT_PUBLIC_TEST_DISC_ID] = DiscCertificate
  Certificates[process.env.NEXT_PUBLIC_TEST_CEAL_ID] = CealCertificate

  function Certificate() {
    const Certificate = Certificates[testPostulant.test.id]
    return <Certificate test={test} postulant={postulant} company={company} answer={answer} updatedAt={updatedAt} state={state} profile={profile} />
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            x
          </button>
            <Certificate />
        </div>
      </div>
    </>
  );
}