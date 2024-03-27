import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction.js";
import FilterBar from "./FilterBar.jsx";
import ProductsList from "./ProductsList.jsx";
import { productSelector } from "../redux/slices/productSlice.js";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const dispatch = useDispatch();

  const {products, productLoading} = useSelector(productSelector)

  useEffect(() => {
    dispatch(getProducts({ keyword, page: 1, limit: 5 }));
  }, [keyword]);

  return (
    <div className="container py-3">
      <p className="mb-3 text-lg italic">
        Search results for <span className="font-bold">"{keyword}"</span>
      </p>
      <div className=" flex gap-4">
        <FilterBar />
        <div className="flex-1 ms-4">
          <ProductsList products={products} isLoading={productLoading} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
