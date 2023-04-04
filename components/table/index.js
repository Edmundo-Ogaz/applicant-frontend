import styles from './table.module.css'

export default function Table({colums, data, currentPage, totalPages, onPageChange}) {
	console.log('table')

  function goToPage(page) {
    onPageChange(page);
  }

  return (
    <>
      <table className={styles.search__list}>
        <thead className={styles['list-header']}>
          <tr>
            {colums.map(item => {
              return(<th key={item.name} className={styles.list__cell} style={item.style}>{item.name}</th>)})}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            return(
              <tr key={idx} className={styles['list-body-row']}>
                {row.map((item, idx) => 
                  <td key={idx} className={styles.list__cell}>{item}</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button className={styles.footer__button} disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>{'<'}</button>
        <span>{` Página ${currentPage} de ${totalPages} `}</span>
        <button className={styles.footer__button} disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>{'>'}</button>
      </div>
    </>
  );
}