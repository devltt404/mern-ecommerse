import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import ProductsList from "../components/ProductsList.jsx";
import { getProducts } from "../redux/actions/productsAction.js";
import { categoriesSelector } from "../redux/slices/categoriesSlice.js";

const CategoryProductsPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { categories } = useSelector(categoriesSelector);

  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const res = categories.find((c) => c.hyphenSeparated === category)._id;
    setCategoryId(res);
    dispatch(getProducts({ category: res, page: 1, limit: 5}));
  }, [category]);

  return (
    categoryId && (
      <div className="container py-8 flex gap-4">
        <FilterBar categoryId={categoryId} />
        <div className="flex-1 ms-4">
          <ProductsList />
        </div>
      </div>
    )
  );
};

export default CategoryProductsPage;
