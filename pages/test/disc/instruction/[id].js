import Link from 'next/link'

import WithPrivateRoute from '@/components/WithPrivateRoute.js'

import Layout from '@/components/layout/index.js';

export default function Instruction({id}) {
	console.log('Instruction')

  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="jumbotron w-75" style={{margin: 'auto'}}>
              <h1 className="display-4">TEST DISC</h1>
              <p className="lead">CONTESTE CON SINCERIDAD SIN DETENERSE DEMASIADO TIEMPO EN CADA UNA </p>
              <hr className="my-4" />
              <p>En cada uno de los 28 grupos de palabras, escoja la palabra que más lo(a) represente y márquela en la columna MAS y escoja una palabra que menos lo(a) represente y márquela en la columna MENOS.</p>
              <Link
              href={{
                pathname: '/test/disc/test',
                query: { id },
              }}
              role="button"
              className="btn btn-warning btn-lg" 
            >
              Ir a la prueba
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

Instruction.Auth = WithPrivateRoute

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps', params.id);
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: `/error?message=Problemas al obtener parametros`,
        }
      };
    }

    const testsPortulants = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/${id}`)
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
        id: testsPortulants.id
      },
    }
  } catch(e) {
    console.log(e)
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${e.message}`,
      }
    };
  }
}