import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  pageIndex: number;
  getCanPreviousPage?: any;
  previousPage?: any;
  getCanNextPage?: any;
  nextPage?: any;
  getPageCount?: any;
  setPageIndex?: any;
  getState?: any;
};

const PaginationBtn: React.FC<PaginationProps> = ({
  pageIndex,
  getCanPreviousPage,
  previousPage,
  getCanNextPage,
  nextPage,
  getPageCount,
  setPageIndex,
  getState,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            // disabled={!getCanPreviousPage()}
            variant="ghost"
            onClick={() => previousPage()}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          {/* <PaginationLink>{pageIndex + 1}</PaginationLink> */}
          <div className="flex items-center gap-2">
            {Array.from({ length: getPageCount() }).map((_, index) => (
              <Button
                variant="ghost"
                key={index}
                size="sm"
                onClick={() => setPageIndex(index)}
                disabled={getState().pagination.pageIndex === index}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <Button
            // disabled={!getCanNextPage()}
            variant="ghost"
            onClick={() => nextPage()}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBtn;
