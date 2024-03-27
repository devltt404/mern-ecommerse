import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import ProductsList from "../components/ProductsList.jsx";
import { getProducts } from "../redux/actions/productAction.js";
import { categorySelector } from "../redux/slices/categorySlice.js";
import { productSelector } from "../redux/slices/productSlice.js";

const CategoryProductsPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { products, productLoading } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const res = categories.find((c) => c.hyphenSeparated === category)._id;
    setCategoryId(res);
    dispatch(getProducts({ category: res, page: 1, limit: 5 }));
  }, [category]);

  return (
    categoryId && (
      <div className="container py-8 flex gap-4">
        <FilterBar categoryId={categoryId} />
        <div className="flex-1 ms-4">
          <ProductsList products={products} isLoading={productLoading} />
        </div>
      </div>
    )
  );
};

export default CategoryProductsPage;
