import { useState } from "react";
import { LuMinus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productsAction.js";
import Button from "./Button.jsx";
import Checkbox from "./Checkbox.jsx";
import FilterItem from "./FilterItem.jsx";
import RatingRow from "./RatingRow.jsx";

const FilterBar = ({ categoryId }) => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [minRating, setMinRating] = useState(0);

  const handleApplyFilter = () => {
    const filterOptions = {};
    if (minPrice >= 0) filterOptions.minPrice = minPrice;
    if (maxPrice >= 0) filterOptions.maxPrice = maxPrice;
    if (minRating > 0) filterOptions.minRating = minRating;
    if (categoryId) filterOptions.category = categoryId;
    dispatch(getProducts(filterOptions));
  };

  const handleClearFilter = () => {
    setMinPrice(-1);
    setMaxPrice(-1);
    setMinRating(0);
    dispatch(getProducts(categoryId ? { category: categoryId } : {}));
  };

  return (
    <div className="py-4 px-3 h-fit rounded-lg border border-gray-300">
      <h2 className="font-semibold text-lg text-center">Filter</h2>
      <FilterItem title="Price">
        <div className="flex items-center gap-2">
          <input
            className="p-2 border border-gray-300 rounded-lg w-24"
            type="number"
            placeholder="Min"
            value={minPrice < 0 ? "" : minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <LuMinus size={12} />
          <input
            className="p-2 border border-gray-300 rounded-lg w-24"
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
              <RatingRow rating={rating} />
            </Checkbox>
          );
        })}
      </FilterItem>

      <div className="flex gap-2 mt-4 mb-1">
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
