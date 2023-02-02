import Layout from '../components/layout';

import WithPrivateRoute from '../components/WithPrivateRoute.js'

export default function Home({ allPostsData }) {
  return (
    <>
      <Layout>
      </Layout>
    </>
  );
}

Home.Auth = WithPrivateRoute