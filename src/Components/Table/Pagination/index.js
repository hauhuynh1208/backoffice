import React from "react";
import { Button } from "@material-ui/core";
import "./index.scss";

const sizeOptions = [
  { value: 25, text: 25 },
  { value: 50, text: 50 },
  { value: 100, text: 100 },
  { value: 200, text: 200 },
];
const total = 10000;
const Pagination = ({
  pageSize,
  pageIndex,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
}) => {
  console.log(pageOptions);
  return (
    <div className="pagination-bottom">
      <div className="-pagination">
        <div className="-previous">
          <Button
            className="-btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
        </div>
        <div className="-center">
          <span className="-pageInfo">
            Page{" "}
            <div className="-pageJump">
              <input
                aria-label="jump to page"
                type="number"
                defaultValue={pageIndex + 1}
                onBlur={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>{" "}
            of <span className="-totalPages">{pageOptions.length}</span>
          </span>
          <span className="select-wrap -pageSizeOptions">
            <select
              aria-label="rows per page"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[25, 50, 100, 200, 1000].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} rows
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="-next">
          <Button
            className="-btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
