import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  pageIndex?: number;
  getCanPreviousPage?: any;
  previousPage?: any;
  getCanNextPage?: any;
  nextPage?: any;
};

const PaginationBtn: React.FC<PaginationProps> = ({
  pageIndex,
  getCanPreviousPage,
  previousPage,
  getCanNextPage,
  nextPage,
}) => {
  if (pageIndex === 0) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={getCanPreviousPage()}
              variant="ghost"
              onClick={() => previousPage()}
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{pageIndex + 1}</PaginationLink>
          </PaginationItem>
          {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
          <PaginationItem>
            <Button
              disabled={!getCanNextPage()}
              variant="ghost"
              onClick={() => nextPage()}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
};

export default PaginationBtn;
