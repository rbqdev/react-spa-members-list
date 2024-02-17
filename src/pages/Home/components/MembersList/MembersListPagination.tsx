import { Button } from "@lib/shadcn/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@lib/shadcn/components/ui/pagination";
import { maxMembersPerPage } from "@pages/Home/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useMemo } from "react";

type GetPaginationItemsProps = {
  totalPages: number;
  currentPage: number;
  lastPageIndex: number;
  goToPage: (value: number) => void;
};

const getPages = ({
  currentPage,
  totalPages,
  lastPageIndex,
  goToPage,
}: GetPaginationItemsProps) => {
  const maxPages = 5;
  const data = [] as React.ReactNode[];

  if (totalPages <= maxMembersPerPage) {
    for (let index = 1; index <= totalPages; index++) {
      data.push(
        <PaginationItem key={`page-${index}`}>
          <Button
            key={`page-${index}`}
            variant={index === currentPage ? "outline" : "ghost"}
            disabled={index === currentPage}
            onClick={() => goToPage(index)}
          >
            {index}
          </Button>
        </PaginationItem>
      );
    }
  } else {
    const leftside = currentPage - maxPages / 2 > 1;
    if (leftside) {
      data.push(
        <PaginationItem key="page-ellipsis-left">
          <PaginationEllipsis className="text-slate-300" />
        </PaginationItem>
      );
    }

    const start = Math.max(1, Math.round(currentPage - maxPages / 2));
    for (let index = start; index <= lastPageIndex; index++) {
      data.push(
        <PaginationItem key={`page-${index}`}>
          <Button
            variant={index === currentPage ? "outline" : "ghost"}
            disabled={index === currentPage}
            onClick={() => goToPage(index)}
          >
            {index}
          </Button>
        </PaginationItem>
      );
    }

    const rightside = currentPage + maxPages / 2 < totalPages;
    if (rightside) {
      data.push(
        <PaginationItem key="page-ellipsis-right">
          <PaginationEllipsis className="text-slate-300" />
        </PaginationItem>
      );
    }
  }

  return data;
};

type MembersListPaginationProps = {
  totalMembers: number;
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
  goToPage: (value: number) => void;
};

export const MembersListPagination = ({
  totalMembers,
  currentPage,
  previousPage,
  nextPage,
  goToPage,
}: MembersListPaginationProps) => {
  const pagesRounded = Math.trunc(totalMembers / maxMembersPerPage);
  const calcRest = (totalMembers / maxMembersPerPage) % 1;
  const totalPages = calcRest !== 0 ? pagesRounded + 1 : pagesRounded;
  const isFirstPage = currentPage === 1;
  const lastPageIndex = Math.min(
    totalPages,
    Math.round(currentPage + maxMembersPerPage / 2)
  );
  const isLastPage = currentPage === lastPageIndex;

  const computedPaginationItems = useMemo(
    () => getPages({ currentPage, totalPages, lastPageIndex, goToPage }),
    [currentPage, goToPage, lastPageIndex, totalPages]
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* hidden: Semantic app heading */}
        <h4 className="hidden">Paginação de membros</h4>

        <PaginationItem>
          <Button
            variant="outline"
            className="rounded-full w-[30px] h-[30px] py-0 px-0 mr-3"
            disabled={isFirstPage}
            onClick={previousPage}
          >
            <ArrowLeftIcon className="w-3 h-3" />
          </Button>
        </PaginationItem>

        {computedPaginationItems.map((page) => page)}

        <PaginationItem>
          <Button
            variant="outline"
            className="rounded-full w-[30px] h-[30px] py-0 px-0 ml-3"
            disabled={isLastPage}
            onClick={nextPage}
          >
            <ArrowRightIcon className="w-3 h-3" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
