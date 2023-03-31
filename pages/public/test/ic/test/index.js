import TestIc from '@/components/test/ic/test/index.js'

export default function IC({id}) {
	console.log('IC')

  return (
    <>
      <TestIc id={id} url={'/public/test/ic/success'}/>
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
    const testsPortulants = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${query.id}`)
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
        id: testsPortulants.id,
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