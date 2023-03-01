import WithPrivateRoute from '@/components/WithPrivateRoute.js'

import Layout from '@/components/layout/index.js';

export default function Link({id}) {
	console.log('Link', id)

  return (
    <>
      <Layout>
        {location.protocol}{'//'}{location.host}/user/password/{id}
      </Layout>
    </>
  );
}

Link.Auth = WithPrivateRoute

export async function getServerSideProps({ query }) {
    try {
      console.log('getServerSideProps', query);
      const id = query.id
      if (isNaN(id)) {
        return {
          redirect: {
            permanent: false,
            destination: `/error?message=bad params`,
          }
        };
      }
  
      return {
        props: { 
          id,
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
