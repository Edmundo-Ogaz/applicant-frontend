import Header from '@/components/header/index'

export default function Error({message}) {
	console.log('Error', message)

  return (
    <>
      <Header />
      {message}
    </>
  );
}

export async function getServerSideProps({query}) {
    console.log('getServerSideProps', query);

    return {
      props: {
        message: query.message
      },
    }
}
