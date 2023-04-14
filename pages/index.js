import Layout from '../components/layout';

import WithPrivateRoute from '../components/WithPrivateRoute.js'

export default function Index() {

  return (
    <>
      <Layout>
      </Layout>
    </>
  );
}

Index.Auth = WithPrivateRoute