import { useState } from 'react';

import styles from './table.module.css'

export default function Table({colums, data, totalPages, onPageChange}) {
	console.log('table')

  const [currentPage, setCurrentPage] = useState(1);

  function goToPage(page) {
    setCurrentPage(page);
    onPageChange(page);
  }

  return (
    <>
      <table className={styles.search__list}>
          <thead className={styles['list-header']}>
            <tr>
              {colums.map(item => {
                return(<th key={item.name} style={item.style}>{item.name}</th>)})}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              return(
                <tr key={idx} className={styles['list-body-row']}>
                  {row.map((item, idx) => 
                    <td key={idx}>{item}</td>
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