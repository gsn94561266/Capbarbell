import React from 'react';
// 表格套件
import { useTable, usePagination } from 'react-table';
// 圖示
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './Table.scss';

const Table = ({ columns, data, tableType }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 30 },
    },
    usePagination
  );

  // 總數文字
  let totalText;
  if (tableType === 'customer') {
    totalText = `${data.length} Customers`;
  } else if (tableType === 'order') {
    totalText = `${data.length} Orders`;
  }

  return (
    <>
      <div className="table-container">
        <table {...getTableProps()} className="w-100">
          <thead className="shadow-sm position-sticky top-0 z-1">
            {headerGroups.map((headerGroup, i) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={i}
                className="bg-light">
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    className={`py-3 ${column.className}`}
                    {...column.getHeaderProps()}>
                    <div className="text-dark  bg-light">
                      {column.render('Header')}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i} className="hover">
                  {row.cells.map((cell, i) => (
                    <td
                      className={`py-3 border-bottom text-secondary fw-bold bg-light ${cell.column.className}`}
                      key={i}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 分頁 */}
      <div className="py-3 py-lg-4">
        <div className="d-flex justify-content-center position-relative">
          <button
            className="mx-1 border-0 bg-light"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}>
            <IoIosArrowBack />
          </button>
          <div>
            {pageOptions.map((pageNumber, i) => {
              const isCurrentPage = pageNumber === pageIndex;
              const isFirstPage = pageNumber === 0;
              const isLastPage = pageNumber === pageOptions.length - 1;

              if (
                isFirstPage ||
                isLastPage ||
                (pageNumber >= pageIndex - 1 && pageNumber <= pageIndex + 1) ||
                (isFirstPage && i === 2) ||
                (isLastPage && i === pageOptions.length - 3)
              ) {
                return (
                  <button
                    key={i}
                    className={`mx-1 ${
                      isCurrentPage
                        ? 'border-0 bg-secondary text-light rounded px-2 py-1'
                        : 'border-0 bg-light px-2 py-1'
                    }`}
                    onClick={() => gotoPage(pageNumber)}>
                    {pageNumber + 1}
                  </button>
                );
              } else if (
                (i === 2 && !isFirstPage && pageIndex >= 4) ||
                (i === pageOptions.length - 3 && !isLastPage)
              ) {
                return <span key={i}>...</span>;
              }
              return null;
            })}
          </div>
          <button
            className="mx-1 border-0 bg-light"
            onClick={() => nextPage()}
            disabled={!canNextPage}>
            <IoIosArrowForward />
          </button>
          <div className="text-secondary fw-bold position-absolute end-0 m-2 d-md-block d-none">
            {totalText}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
