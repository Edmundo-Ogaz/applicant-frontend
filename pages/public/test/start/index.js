import IcTest from '@/components/test/ic/test/index.js'
import DiscTest from '@/components/test/disc/test/index.js'
import CealTest from '@/components/test/ceal/test/index.js'

export default function Start({testPostulant}) {
	console.log('Start')

  const Tests = []
  Tests[process.env.NEXT_PUBLIC_TEST_IC_ID] = IcTest
  Tests[process.env.NEXT_PUBLIC_TEST_DISC_ID] = DiscTest
  Tests[process.env.NEXT_PUBLIC_TEST_CEAL_ID] = CealTest

  function Test() {
    const id = testPostulant.id
    const type = testPostulant.test.name.toLowerCase()
    let Test = Tests[testPostulant.test.id]
    return <Test id={id} url={`/public/test/${type}/success`} />
  }

  return (
    <>
      <Test />
    </>
  );
}

export async function getServerSideProps({query}) {
  try {
    console.log('getServerSideProps',query.id);
    if (isNaN(query.id)) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=Problemas al obtener parametros`,
        }
      };
    }
    const testPostulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${query.id}`)
      .then(testPostulant => testPostulant.json())

    if (Object.keys(testPostulant).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=No se pudo obtener el test del postulanta`,
        }
      };
    }

    if (testPostulant.state.id == process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=Test terminado`,
        }
      };
    }

    return {
      props: {
        testPostulant
      },
    }
  } catch(e) {
    console.error(e)
    return {
      redirect: {
        permanent: false,
        destination: `/public/error?message=${e.message}`,
      }
    };
  }
}