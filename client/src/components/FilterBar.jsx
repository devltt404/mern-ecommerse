import { useCallback, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction.js";
import Button from "./Button.jsx";
import Checkbox from "./Checkbox.jsx";
import FilterItem from "./FilterItem.jsx";
import RatingRow from "./RatingRow.jsx";

const FilterBar = ({ categoryId }) => {
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
  });

  const handleClearFilter = () => {
    setMinPrice(-1);
    setMaxPrice(-1);
    setMinRating(0);
    dispatch(getProducts(filterOptions));
  };

  return (
    <div className="py-4 px-3 h-fit  ">
      <h2 className="font-semibold text-2xl mb-4">Filters</h2>

      <FilterItem title="Price">
        <div className="flex items-center gap-2">
          <input
            className="py-2 text-sm px-3 border border-gray-300 w-24"
            type="number"
            placeholder="Min"
            value={minPrice < 0 ? "" : minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <LuMinus size={12} />
          <input
            className="py-2 text-sm px-3 border border-gray-300 w-24"
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
    </div>
  );
};

export default FilterBar;
