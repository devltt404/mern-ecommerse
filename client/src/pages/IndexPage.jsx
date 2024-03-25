import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductsList from "../components/ProductsList.jsx";
import { getProducts } from "../redux/actions/productsAction.js";

const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 3 }));
  });

  return (
    <div className="container py-8">
      <h1 className="font-semibold text-2xl mb-4">Best selling</h1>
      <ProductsList size="lg" />
      <h1 className="font-semibold text-2xl mb-4">Best rating</h1>
      <ProductsList size="lg" />
      <h1 className="font-semibold text-2xl mb-4">Latest releases</h1>
      <ProductsList size="lg" />
    </div>
  );
};

export default IndexPage;
