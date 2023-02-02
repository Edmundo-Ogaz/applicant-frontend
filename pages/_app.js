import Avatar from '@/components/avatar';

import '@/styles/global.css'
import Head from "next/head";

const Noop = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <Auth>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 id="logo">Applicant</h1>
        <Avatar/>
      </header>
      <Component {...pageProps} />
    </Auth>
  );
}
