import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

const Pagination = ({ handlePageSelected, totalPages, page }) => {
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  const onPageSelected = (pageValue) => {
    setInputPage(pageValue);
    handlePageSelected(pageValue);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-1 text-sm">
      <button
        className="flex h-8 w-8 items-center justify-center py-1 transition hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        onClick={() => onPageSelected(1)}
        disabled={inputPage === 1}
      >
        <RxDoubleArrowLeft size={18} />
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center py-1 transition hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        onClick={() => onPageSelected(inputPage - 1)}
        disabled={inputPage === 1}
      >
        <GoChevronLeft size={18} />
      </button>
      <input
        type="number"
        className="focus:shadow-outer me-1 h-8 w-8 border border-gray-300 p-1 text-center shadow-black outline-none transition focus:border-black disabled:opacity-50 disabled:hover:bg-transparent"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!inputPage || inputPage < 1 || inputPage > totalPages) {
              toast.error("Please enter a valid page number.");
            } else {
              onPageSelected(inputPage);
              e.target.blur();
            }
          }
        }}
        onBlur={() => {
          if (!inputPage || inputPage < 1 || inputPage > totalPages) {
            setInputPage(page);
          } else {
            onPageSelected(inputPage);
          }
        }}
      />

      <span>of {totalPages}</span>
      <button
        className="flex h-8 w-8 items-center justify-center py-1 transition hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        onClick={() => onPageSelected(inputPage + 1)}
        disabled={inputPage === totalPages}
      >
        <GoChevronRight size={18} />
      </button>
      <button
        className="flex h-8 w-8 items-center justify-center py-1 transition hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
        disabled={inputPage === totalPages}
        onClick={() => onPageSelected(totalPages)}
      >
        <RxDoubleArrowRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
