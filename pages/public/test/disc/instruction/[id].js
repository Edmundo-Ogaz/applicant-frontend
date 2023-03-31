import Link from 'next/link'

import DiscInstruction from '@/components/test/disc/instruction/index.js'

export default function Instruction({id}) {
	console.log('Instruction')

  return (
    <>
    <DiscInstruction id={id} url={'/public/test/disc/test'}/>
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
    const testsPortulants = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
      .then(testsPortulants => testsPortulants.json())

    if (Object.keys(testsPortulants).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=No se pudo obtener el test del postulanta`,
        }
      };
    }

    if (testsPortulants.state.id == process.env.NEXT_PUBLIC_TEST_STATE_DONE_ID) {
      return {
        redirect: {
          permanent: false,
          destination: `/public/error?message=Test terminado`,
        }
      };
    }

    return {
      props: {
        id: testsPortulants.id
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