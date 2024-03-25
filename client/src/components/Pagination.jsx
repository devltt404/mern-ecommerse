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
    <div className="flex items-center gap-1 text-sm">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-md py-1 transition hover:bg-gray-200 disabled:hover:bg-transparent disabled:opacity-50"
        onClick={() => onPageSelected(1)}
        disabled={inputPage === 1}
      >
        <RxDoubleArrowLeft size={18} />
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-md py-1 transition hover:bg-gray-200 disabled:hover:bg-transparent disabled:opacity-50"
        onClick={() => onPageSelected(inputPage - 1)}
        disabled={inputPage === 1}
      >
        <GoChevronLeft size={18} />
      </button>
      <input
        type="number"
        className="p-1 w-8 h-8 border border-gray-300 outline-none text-center me-1 focus:border-black disabled:hover:bg-transparent disabled:opacity-50"
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
        className="w-8 h-8 flex items-center justify-center rounded-md py-1 transition hover:bg-gray-200 disabled:hover:bg-transparent disabled:opacity-50"
        onClick={() => onPageSelected(inputPage + 1)}
        disabled={inputPage === totalPages}
      >
        <GoChevronRight size={18} />
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center rounded-md py-1 transition hover:bg-gray-200 disabled:hover:bg-transparent disabled:opacity-50"
        disabled={inputPage === totalPages}
        onClick={() => onPageSelected(totalPages)}
      >
        <RxDoubleArrowRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
