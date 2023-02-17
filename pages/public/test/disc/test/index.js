import TestDisc from '@/components/test/disc/test/index.js'

export default function IC({id}) {
	console.log('IC')

  return (
    <>
      <TestDisc id={id} url={'/public/test/disc/success'}/>
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
          destination: `/error?message=Problemas al obtener parametros`,
        }
      };
    }
    const testsPortulants = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${query.id}`)
      .then(testsPortulants => testsPortulants.json())

    if (Object.keys(testsPortulants).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: `/error?message=No se pudo obtener el test del postulanta`,
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
        destination: `/error?message=${e.message}`,
      }
    };
  }
}