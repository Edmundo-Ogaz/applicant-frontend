import Link from 'next/link'

export default function Instruction(props) {
	console.log('Instruction')

  const { id, url } = props;

  return (
    <>
      <div className="container-fluid">
        <div className="jumbotron w-75" style={{margin: 'auto'}}>
            <h1 className="display-4">TEST DISC</h1>
            <p className="lead">CONTESTE CON SINCERIDAD SIN DETENERSE DEMASIADO TIEMPO EN CADA UNA</p>
            <hr className="my-4" />
            <p>En cada uno de los 28 grupos de palabras, escoja la palabra que más lo(a) represente y márquela en la columna MAS y escoja una palabra que menos lo(a) represente y márquela en la columna MENOS.</p>
            <Link
            href={{
              pathname: url,
              query: { id },
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