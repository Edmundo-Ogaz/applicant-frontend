import Link from 'next/link'

export default function Instruction({id}) {
	console.log('Instruction')

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
              pathname: '/test/ic/test',
              query: { id },
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
    console.log('getServerSideProps', query.id);
    if (isNaN(query.id)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error?message=Problemas al obtener parametros",
        }
      };
    }
    const URL = `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${query.id}`
    console.log('getServerSideProps', URL);
    const testsPortulants = await fetch(URL)
    .then(testsPortulants => testsPortulants.json())
    console.log('getServerSideProps', testsPortulants);
    if (Object.keys(testsPortulants).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/error?message=No se pudo obtener el test del postulanta",
        }
      };
    }
    return {
      props: {
        id: testsPortulants.id
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}