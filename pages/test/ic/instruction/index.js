import Link from 'next/link'

export default function Instruction2({postulantId, companyId}) {
	console.log('Instruction2')

  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron w-75" style={{margin: 'auto'}}>
          <h1 className="display-4">TEST IC</h1>
          <p className="lead">Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.</p>
          <hr className="my-4"/>
          <p>Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!</p>
          <Link
            href={{
              pathname: '/test/ic/ic',
              query: { postulant: postulantId, company: companyId },
            }}
            role="button"
            className="btn btn-warning btn-lg" 
          >
            Ir a la prueba
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({query}) {
  try {
    console.log('getServerSideProps', query.postulant, query.company);
    if (isNaN(query.postulant) || isNaN(query.company)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests-postulants?postulant=${query.postulant}&company=${query.company}&state=${process.env.NEXT_PUBLIC_TEST_STATE_PENDING_ID}`
    console.log('getServerSideProps', URL);
    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    console.log('getServerSideProps', testsPortulants);
    if (!Array.isArray(testsPortulants) || testsPortulants.length !== 1) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    return {
      props: {
        postulantId: testsPortulants[0].postulant, 
        companyId: testsPortulants[0].company
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}