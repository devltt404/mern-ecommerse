import { useCallback, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction.js";
import Button from "./Button.jsx";
import Checkbox from "./Checkbox.jsx";
import FilterItem from "./FilterItem.jsx";
import RatingRow from "./RatingRow.jsx";
import Sidebar from "./Sidebar.jsx";

const FilterMenu = ({ categoryId, setShowSidebar = () => {} }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const filterOptions = { page: 1, limit: 5 };
  if (categoryId) filterOptions.category = categoryId;
  if (searchParams.get("keyword"))
    filterOptions.keyword = searchParams.get("keyword");

  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [minRating, setMinRating] = useState(0);

  const handleApplyFilter = useCallback(() => {
    const tempOptions = { ...filterOptions };
    if (minPrice >= 0) tempOptions.minPrice = minPrice;
    if (maxPrice >= 0) tempOptions.maxPrice = maxPrice;
    if (minRating > 0) tempOptions.minRating = minRating;
    if (categoryId) tempOptions.category = categoryId;
    dispatch(getProducts(tempOptions));
    setShowSidebar(false);
  });

  const handleClearFilter = () => {
    setMinPrice(-1);
    setMaxPrice(-1);
    setMinRating(0);
    dispatch(getProducts(filterOptions));
    setShowSidebar(false);
  };
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Filters</h2>

      <FilterItem title="Price">
        <div className="flex items-center gap-2">
          <input
            className="w-24 px-3 py-2 border border-gray-300"
            type="number"
            placeholder="Min"
            value={minPrice < 0 ? "" : minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <LuMinus size={12} />
          <input
            className="w-24 px-3 py-2 border border-gray-300"
            type="number"
            placeholder="Max"
            value={maxPrice < 0 ? "" : maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </FilterItem>

      <FilterItem title="Rating">
        {[4, 3, 2, 1].map((rating) => {
          return (
            <Checkbox
              key={rating}
              value={rating}
              checked={rating === minRating}
              onChange={() => {
                if (rating === minRating) setMinRating(0);
                else setMinRating(rating);
              }}
            >
              <RatingRow rating={rating} size={15} />
            </Checkbox>
          );
        })}
      </FilterItem>

      <div className="flex gap-3 mt-4 mb-1">
        <Button
          variant="fill"
          size="xs"
          width="full"
          onClick={handleApplyFilter}
        >
          Apply
        </Button>
        <Button
          variant="outline"
          size="xs"
          width="full"
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

const FilterBar = ({ categoryId }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          ToggleButton={
            <button
              type="button"
              className="fixed z-10 flex items-center gap-1 px-4 py-2 text-white transition bg-black border-2 rounded-md glow bottom-10 right-12 md:right-4 hover:shadow-xl hover:scale-110"
            >
              <MdFilterListAlt size={25} />
              <span>Filter Products</span>
            </button>
          }
        >
          <div className="px-6 py-8">
            <FilterMenu
              categoryId={categoryId}
              setShowSidebar={setShowSidebar}
            />
          </div>
        </Sidebar>
      </div>

      <div className="hidden min-lg:block">
        <FilterMenu categoryId={categoryId} />
      </div>
    </>
  );
};

export default FilterBar;
