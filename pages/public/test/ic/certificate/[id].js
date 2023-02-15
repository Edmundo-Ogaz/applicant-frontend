import IcCertificate from '@/components/test/ic/certificate/index.js'

export default function Certificate({ test, postulant, answer, date, state }) {
  console.log('Certificate')

  return (
    <>
      <IcCertificate test={test} postulant={postulant} answer={answer} date={date} state={state} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    console.log('getServerSideProps');
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: `/error?message=bad params`,
        }
      };
    }

    const testPortulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
      .then(testPortulant => testPortulant.json())
    const { test, postulant, answer, date, state } = { ...testPortulant }
    return {
      props: { 
        test, 
        postulant, 
        answer, 
        date, 
        state 
      }
    }
  } catch (e) {
    console.error(e)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}