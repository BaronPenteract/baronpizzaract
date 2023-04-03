import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  forcePage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ forcePage, pageCount, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root + ' background'}
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
