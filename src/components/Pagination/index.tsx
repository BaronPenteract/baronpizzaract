import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = { forcePage: number; pageCount: number; onChangePage: any };

const Pagination: React.FC<PaginationProps> = ({ forcePage, pageCount, onChangePage }) => {
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
        renderOnZeroPageCount={undefined}
      />
    </>
  );
};

export default Pagination;
