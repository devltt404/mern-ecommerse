import { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import Button from "../button/Button.jsx";
import Checkbox from "../input/Checkbox.jsx";
import RatingRow from "../rating/RatingRow.jsx";

const FilterItem = ({ children, title }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
};

const FilterMenu = ({
  filterOptions,
  setFilterOptions,
  setShowSidebar = () => {},
}) => {
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [minRating, setMinRating] = useState(0);

  const handleApplyFilter = () => {
    const tempFilterOptions = { ...filterOptions };
    if (minPrice >= 0) tempFilterOptions.minPrice = minPrice;
    else delete tempFilterOptions.minPrice;
    if (maxPrice >= 0) tempFilterOptions.maxPrice = maxPrice;
    else delete tempFilterOptions.maxPrice;
    if (minRating > 0) tempFilterOptions.minRating = minRating;
    else delete tempFilterOptions.minRating;
    setFilterOptions(tempFilterOptions);
    setShowSidebar(false);
  };

  const handleClearFilter = () => {
    setMinPrice(-1);
    setMaxPrice(-1);
    setMinRating(0);
    const tempFilterOptions = { ...filterOptions };
    delete tempFilterOptions.minPrice;
    delete tempFilterOptions.maxPrice;
    delete tempFilterOptions.minRating;
    setFilterOptions(tempFilterOptions);
    setShowSidebar(false);
  };

  useEffect(() => {
    if (!filterOptions.minPrice) setMinPrice(-1);
    if (!filterOptions.maxPrice) setMaxPrice(-1);
    if (!filterOptions.minRating) setMinRating(0);
  }, [filterOptions]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Filters</h2>

      <FilterItem title="Price">
        <div className="flex items-center gap-2">
          <input
            className="w-full border border-gray-300 px-3 py-2"
            type="number"
            placeholder="Min"
            value={minPrice < 0 ? "" : minPrice}
            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          />
          <div>
            <LuMinus className="text-gray-500" size={12} />
          </div>
          <input
            className="w-full border border-gray-300 px-3 py-2"
            type="number"
            placeholder="Max"
            value={maxPrice < 0 ? "" : maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
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

      <div className="mb-1 mt-4 flex gap-3">
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

export default FilterMenu;
