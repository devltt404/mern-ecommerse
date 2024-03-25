import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm.jsx";
import { addProduct } from "../../redux/actions/productsAction.js";

const AddProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
      <ProductForm
        onSubmit={async (values) => {
          await dispatch(addProduct(values));
          navigate("/admin/products");
        }}
        initialValues={{
          name: "Iphone 7",
          price: "300",
          stock: "30",
          category: "65f71d74170cb72c383386ed",
          description:
            "Apple's iPhone 7 Plus offers a familiar 5.5-inch display and marked design changes, both good and bad.",
          images: [
            "https://static.wikia.nocookie.net/ipod/images/2/2e/IPhone207.png/revision/latest?cb=20200822093559",
          ],
        }}
      />
    </div>
  );
};

export default AddProductPage;