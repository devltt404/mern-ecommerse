import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction.js";
import { productSelector } from "../redux/slices/productSlice.js";
import FilterBar from "./FilterBar.jsx";
import Pagination from "./Pagination.jsx";
import ProductsList from "./ProductsList.jsx";
import Dropdown from "./dropdown/Dropdown.jsx";
import DropdownItem from "./dropdown/DropdownItem.jsx";
import DropdownMenu from "./dropdown/DropdownMenu.jsx";
import DropdownToggler from "./dropdown/DropdownToggler.jsx";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const dispatch = useDispatch();

  const { products, productLoading, pagination } = useSelector(productSelector);

  const sortByOptions = {
    "Top Rated": "topRated",
    "Price: Low to High": "priceAsc",
    "Price: High to Low": "priceDesc",
  };
  const [sortBy, setSortBy] = useState("Top Rated");

  useEffect(() => {
    dispatch(
      getProducts({ keyword, page: 1, limit: 5, sortBy: sortByOptions[sortBy] })
    );
  }, [keyword, sortBy]);

  return (
    <div className="container py-8">
      <p className="mb-3 text-lg italic">
        Search results for <span className="font-bold">"{keyword}"</span>
      </p>
      <div className=" flex gap-4">
        <FilterBar />
        <div className="flex-1 ms-4">
          <div className="flex justify-end mb-6">
            <Dropdown>
              <DropdownToggler>
                <button
                  type="button"
                  className="border border-gray-300 px-4 py-2 text-sm flex items-center gap-2"
                >
                  <span className="text-gray-400">Sort By</span>
                  <span className="font-bold">{sortBy}</span>
                  <GoChevronDown />
                </button>
              </DropdownToggler>

              <DropdownMenu position="right" width="full">
                {Object.keys(sortByOptions).map((key) => (
                  <DropdownItem
                    className="text-sm"
                    key={sortByOptions[key]}
                    onClick={() => {
                      setSortBy(key);
                    }}
                  >
                    {key}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <ProductsList products={products} isLoading={productLoading} />

          {!productLoading && products.length > 0 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              handlePageSelected={(page) => {
                dispatch(
                  getProducts({
                    page,
                    keyword,
                    limit: 5,
                    sortBy: sortByOptions[sortBy],
                  })
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
