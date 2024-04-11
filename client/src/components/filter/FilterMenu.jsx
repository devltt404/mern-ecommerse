import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuMinus } from "react-icons/lu";
import Button from "../button/Button.jsx";
import RadioFormInput from "../form/RadioFormInput.jsx";
import TextFormInput from "../form/TextFormInput.jsx";
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
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      minRating: 0,
    },
  });

  const handleApplyFilter = ({ minPrice, maxPrice, minRating }) => {
    const tempFilterOptions = { ...filterOptions };
    if (minPrice != "") tempFilterOptions.minPrice = minPrice;
    else delete tempFilterOptions.minPrice;
    if (maxPrice != "") tempFilterOptions.maxPrice = maxPrice;
    else delete tempFilterOptions.maxPrice;
    if (minRating > 0) tempFilterOptions.minRating = minRating;
    else delete tempFilterOptions.minRating;

    setFilterOptions(tempFilterOptions);
    setShowSidebar(false);
  };

  const handleClearFilter = () => {
    reset();

    const tempFilterOptions = { ...filterOptions };
    delete tempFilterOptions.minPrice;
    delete tempFilterOptions.maxPrice;
    delete tempFilterOptions.minRating;
    setFilterOptions(tempFilterOptions);
    setShowSidebar(false);
  };

  useEffect(() => {
    if (!filterOptions.minPrice) setValue("minPrice", "");
    if (!filterOptions.maxPrice) setValue("maxPrice", "");
    if (!filterOptions.minRating) setValue("minRating", 0);
  }, [filterOptions]);

  const onSubmit = (data) => {
    handleApplyFilter(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4 text-2xl font-semibold">Filters</h2>

      <FilterItem title="Price">
        <div className="flex items-center gap-2">
          <TextFormInput
            control={control}
            name="minPrice"
            placeholder="Min"
            type="number"
          />
          <div>
            <LuMinus className="text-gray-500" size={12} />
          </div>
          <TextFormInput
            control={control}
            name="maxPrice"
            placeholder="Max"
            type="number"
          />
        </div>
      </FilterItem>

      <FilterItem title="Rating">
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map((rating) => {
            return (
              <RadioFormInput
                key={rating}
                name="minRating"
                control={control}
                value={rating}
              >
                <RatingRow rating={rating} size={15} />
              </RadioFormInput>
            );
          })}
        </div>
      </FilterItem>

      <div className="mb-1 mt-4 flex gap-3">
        <Button type="submit" variant="fill" size="xs" width="full">
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
    </form>
  );
};

export default FilterMenu;
