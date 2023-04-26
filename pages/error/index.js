import WithPrivateRoute from '@/components/WithPrivateRoute.js'

import useTranslation from 'next-translate/useTranslation'

import Layout from '@/components/layout/index.js';

export default function Error({message}) {
	console.log('Error', message)

  const { t, lang } = useTranslation('page')

  return (
    <>
      <Layout>
        {t('error')} {message}
      </Layout>
    </>
  );
}

Error.Auth = WithPrivateRoute
