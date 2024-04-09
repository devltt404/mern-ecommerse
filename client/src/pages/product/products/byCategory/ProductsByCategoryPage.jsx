import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { categorySelector } from "../../../../redux/slices/categorySlice.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";

const ProductsByCategoryPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  const dispatch = useDispatch();
  const { products, productLoading, pagination } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [category, setCategory] = useState(params.category.split("&")[0]);

  const sortByOptions = {
    "Top Rated": "topRated",
    "Price: Low to High": "priceAsc",
    "Price: High to Low": "priceDesc",
  };

  const [filterOptions, setFilterOptions] = useState({
    sortBy: "topRated",
    limit: 5,
  });


  useEffect(() => {
    if (category !== params.category) {
      setFilterOptions({
        sortBy: "topRated",
        limit: 5,
      });
    }

    setPage(parseInt(searchParams.get("page")) || 1);
    setCategory(params.category);
  }, [window.location.href]);

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: searchParams.get("keyword"),
        page,
        category: categories.find((cat) => {
          return cat.name.toLowerCase().split(" ").join("-") === category;
        })?._id,
        ...filterOptions,
      }),
    );
  }, [filterOptions, page, category]);

  return (
    <div className="container flex gap-16 py-8 xl:gap-4 lg:gap-0">
      <FilterBar
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <div className="flex-1">
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

        {products.length > 0 && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            handlePageSelected={(page) => {
              navigate("/category/" + category + "?page=" + page);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsByCategoryPage;
