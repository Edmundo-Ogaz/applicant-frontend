import Header from '@/components/header/index'

import useTranslation from 'next-translate/useTranslation'

export default function Success() {
	console.log('Success')

  const { t, lang } = useTranslation('testCealSuccess')

  return (
    <>
      <Header />
      {t('success')}
    </>
  );
}
