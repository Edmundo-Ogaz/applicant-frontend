export default function Error({message}) {
	console.log('Error', message)

  return (
    <>
      Error {message}
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
