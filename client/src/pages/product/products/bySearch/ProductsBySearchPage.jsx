import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FilterBar,
  Pagination,
  ProductsGrid,
} from "../../../../components/index.js";
import { getProducts } from "../../../../redux/actions/productAction.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";

const ProductsBySearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const sortByOptions = {
    "Top Rated": "topRated",
    "Price: Low to High": "priceAsc",
    "Price: High to Low": "priceDesc",
  };

  const [filterOptions, setFilterOptions] = useState({
    sortBy: "topRated",
    limit: 5,
  });

  const navigate = useNavigate();
  const { products, productLoading, pagination } = useSelector(productSelector);

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: searchParams.get("keyword"),
        page: parseInt(searchParams.get("page")) || 1,
        ...filterOptions,
      }),
    );
  }, [filterOptions, searchParams]);

  return (
    <div className="container py-8">
      <p className="mb-4 text-lg italic">
        Search results for{" "}
        <span className="font-bold">"{searchParams.get("keyword")}"</span>
      </p>

      <div className="flex gap-16 xl:gap-4 lg:gap-0">
        <FilterBar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        <div className="ms-4 flex-1">
          <div className="mb-6 flex justify-end">
            <Dropdown>
              <DropdownToggle>
                <button
                  type="button"
                  className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm"
                >
                  <span className="text-gray-400">Sort By</span>
                  <span className="font-bold">
                    {Object.keys(sortByOptions).find(
                      (key) => sortByOptions[key] === filterOptions.sortBy,
                    )}
                  </span>
                  <GoChevronDown />
                </button>
              </DropdownToggle>

              <DropdownMenu position="right" width="full">
                {Object.keys(sortByOptions).map((key) => (
                  <DropdownItem
                    className="text-sm"
                    key={key}
                    onClick={() => {
                      setFilterOptions({
                        ...filterOptions,
                        sortBy: sortByOptions[key],
                      });
                    }}
                  >
                    {key}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <ProductsGrid products={products} isLoading={productLoading} />

          {!productLoading && products.length > 0 && (
            <Pagination
              page={parseInt(searchParams.get("page")) || 1}
              totalPages={pagination.totalPages}
              handlePageSelected={(page) => {
                navigate(
                  "/search?keyword=" +
                    searchParams.get("keyword") +
                    "&page=" +
                    page,
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsBySearchPage;
