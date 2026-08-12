/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/use-pagination";

function getPaginationRange(
  currentPage: number,
  totalPage: number,
  siblingCount = 1
): (number | string)[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPage) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPage - 1;

  const firstPage = 1;
  const lastPage = totalPage;

  let range: (number | string)[] = [];

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    range = [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPage - rightItemCount + 1 + i
    );
    range = [firstPage, "...", ...rightRange];
  } else if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: 2 * siblingCount + 1 },
      (_, i) => leftSiblingIndex + i
    );
    range = [firstPage, "...", ...middleRange, "...", lastPage];
  } else {
    range = Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  return range;
}

interface PaginationButtonProps {
  currentPage?: number;
  totalPage?: number;
  limit?: number;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  currentPage = 1,
  totalPage = 3,
}) => {
  const { setPaginationData } = usePagination();

  const handlePaginationButtonClick = (p: number) => {
    setPaginationData({
      page: p,
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setPaginationData({
        page: currentPage + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPaginationData({
        page: currentPage - 1,
      });
    }
  };

  const pages = getPaginationRange(currentPage, totalPage);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 font-sans">
      <Button
        className="rounded-full w-10 h-10 border-[#E8E2D9] bg-white text-stone-700 hover:bg-sky-50 hover:text-[#0555A2] disabled:opacity-40 transition-all shadow-xs"
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
        size="icon"
        variant="outline"
        aria-label="Previous Page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      {pages.map((pageNumber, i) => {
        if (pageNumber === "...") {
          return (
            <Button
              className="cursor-default rounded-full w-10 h-10 border-[#E8E2D9] bg-[#FAF8F5] text-stone-400"
              disabled
              key={`ellipsis-${i}`}
              variant="outline"
              size="icon"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          );
        }

        const isCurrent = pageNumber === currentPage;

        return (
          <Button
            className={cn(
              "rounded-full h-10 min-w-10 px-3.5 text-xs font-medium transition-all shadow-xs border-[#E8E2D9]",
              isCurrent
                ? "bg-[#0555A2] text-white border-[#0555A2] font-bold hover:bg-[#0555A2]"
                : "bg-white text-stone-700 hover:bg-sky-50 hover:text-[#0555A2] hover:border-sky-200"
            )}
            disabled={isCurrent}
            key={pageNumber}
            onClick={() => handlePaginationButtonClick(pageNumber as number)}
            variant="outline"
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        className="rounded-full w-10 h-10 border-[#E8E2D9] bg-white text-stone-700 hover:bg-sky-50 hover:text-[#0555A2] disabled:opacity-40 transition-all shadow-xs"
        disabled={currentPage === totalPage}
        onClick={handleNextPage}
        size="icon"
        variant="outline"
        aria-label="Next Page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationButton;
