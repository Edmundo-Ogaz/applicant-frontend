import WithPrivateRoute from '@/components/WithPrivateRoute.js'

import Layout from '@/components/layout/index.js';

export default function Error({message}) {
	console.log('Error', message)

  return (
    <>
      <Layout>
        error {message}
      </Layout>
    </>
  );
}

Error.Auth = WithPrivateRoute
