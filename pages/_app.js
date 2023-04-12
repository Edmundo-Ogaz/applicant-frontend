import Head from "next/head";

import '@/styles/global.css'

const Noop = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <Auth>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Auth>
  );
}
