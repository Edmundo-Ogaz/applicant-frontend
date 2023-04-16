import useTranslation from 'next-translate/useTranslation'

export default function Header() {
	console.log('Header')

  const { t, lang } = useTranslation('common')

  return (
    <header style={{display: 'flex', justifyContent: 'space-between'}}>
      <h1 id="logo">{t('applicant')}</h1>
    </header>
  );
}