import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination({ forcePage, pageCount, onChangePage }) {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        forcePage={forcePage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
