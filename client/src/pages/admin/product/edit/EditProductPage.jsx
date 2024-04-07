import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoading from "../../../../components/loading/SpinnerLoading.jsx";
import {
  editProduct,
  getProductById,
} from "../../../../redux/actions/productAction.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";
import ProductForm from "../components/ProductForm.jsx";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, productLoading } = useSelector(productSelector);

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return productLoading ? (
    <SpinnerLoading />
  ) : (
    product && (
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Edit Product</h1>
        <ProductForm
          onSubmit={async (values) => {
            await dispatch(editProduct(id, values));
            navigate(-1);
          }}
          initialValues={{
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category._id,
            description: product.description,
            images: product.images,
          }}
        />
      </div>
    )
  );
};

export default EditProductPage;
