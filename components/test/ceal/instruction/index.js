import Link from 'next/link'

export default function Instruction(props) {
	console.log('Instruction')

  const { id, url } = props;

  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron w-75" style={{margin: 'auto'}}>
          <h1 className="display-4">TEST CEAL</h1>
          <p className="lead">Instrucciones</p>
          <hr className="my-4"/>
            <ul>
              <li> - Esta prueba consta de 12 situaciones. </li>
              <li> - Lea cada situación atentamente y piense lo que Ud. haría en cada circunstancia. </li>
              <li> - Marque la letra de la alternativa que, según Ud., describe mejor su comportamiento en la situación que se presenta. </li>
              <li> - Debe marcar la elección para cada situación en la hoja de respuestas, colocando la letra A,B,C ó D que, según su opinión, describe mejor su comportamiento de líder. </li>
              <li> - No deje ninguna pregunta sin responder. </li>
              <li> - Responda con sinceridad y espontaneidad. </li>
              <li> - Es una prueba sin tiempo </li>
            </ul>
          <hr className="my-4"/>
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