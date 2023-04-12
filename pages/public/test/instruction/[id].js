import Header from '@/components/header/index'

import IcInstruction from '@/components/test/ic/instruction/index.js'
import DiscInstruction from '@/components/test/disc/instruction/index.js'
import CealInstruction from '@/components/test/ceal/instruction/index.js'

export default function Instruction({testPostulant}) {
	console.log('Instruction')

  const Instructions = []
  Instructions[process.env.NEXT_PUBLIC_TEST_IC_ID] = IcInstruction
  Instructions[process.env.NEXT_PUBLIC_TEST_DISC_ID] = DiscInstruction
  Instructions[process.env.NEXT_PUBLIC_TEST_CEAL_ID] = CealInstruction

  function Instruction() {
    const id = testPostulant.id
    let Instruction = Instructions[testPostulant.test.id]
    return <Instruction id={id} url={`/public/test/start`} />
  }

  return (
    <>
      <Header />
      <Instruction />
    </>
  );
}

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps', params.id);
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=Problemas al obtener parametros`,
        }
      };
    }
    const testPostulant = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
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
    console.log(e)
    return {
      redirect: {
        permanent: false,
        destination: `/public/error?message=${e.message}`,
      }
    };
  }
}