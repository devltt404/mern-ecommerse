import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import Pagination from "../components/Pagination.jsx";
import ProductsList from "../components/ProductsList.jsx";
import Dropdown from "../components/dropdown/Dropdown.jsx";
import DropdownItem from "../components/dropdown/DropdownItem.jsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.jsx";
import DropdownToggler from "../components/dropdown/DropdownToggler.jsx";
import { getProducts } from "../redux/actions/productAction.js";
import { categorySelector } from "../redux/slices/categorySlice.js";
import { productSelector } from "../redux/slices/productSlice.js";

const CategoryProductsPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { products, productLoading, pagination } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  const sortByOptions = {
    "Best Rated": "topRated",
    "Price: Low to High": "priceAsc",
    "Price: High to Low": "priceDesc",
  };

  const [categoryId, setCategoryId] = useState(null);
  const [sortBy, setSortBy] = useState("Best Rated");

  useEffect(() => {
    const res = categories.find((c) => c.hyphenSeparated === category)._id;
    setCategoryId(res);
    dispatch(
      getProducts({
        category: res,
        page: 1,
        limit: 5,
        sortBy: sortByOptions[sortBy],
      })
    );
  }, [category, sortBy]);

  return (
    categoryId && (
      <div className="container flex gap-16 py-8 xl:gap-4 lg:gap-0">
        <FilterBar categoryId={categoryId} />
        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <Dropdown>
              <DropdownToggler>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300"
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

          {products.length > 0 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              handlePageSelected={(page) => {
                dispatch(
                  getProducts({
                    category: categoryId,
                    page,
                    limit: 5,
                    sortBy: sortByOptions[sortBy],
                  })
                );
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

export default CategoryProductsPage;
