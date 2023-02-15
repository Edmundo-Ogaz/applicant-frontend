import Link from 'next/link'

export default function Instruction(props) {
	console.log('Instruction')

  const { id, url } = props;

  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron w-75" style={{margin: 'auto'}}>
          <h1 className="display-4">TEST IC</h1>
          <p className="lead">Evaluación de la aptitud para comprender e interpretar rápida y correctamente órdenes complejas.</p>
          <hr className="my-4"/>
          <p>Tienes 8 minutos para completar el test. Si te sales de la página, perderás tus respuestas. Es TÚ responsabilidad realizarlo de forma sensata. Buena suerte!</p>
          <Link
            href={{
              pathname: url,
              query: { id }
            }}
            role="button"
            className="btn btn-warning btn-lg" 
          >
            Ir a la prueba
          </Link>
        </div>
      </div>
    </>
  );
}