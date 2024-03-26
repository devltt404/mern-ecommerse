import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { categorySelector } from "../redux/slices/categorySlice.js";
import { productSelector } from "../redux/slices/productSlice.js";
import Button from "./Button.jsx";
import FormInput from "./FormInput.jsx";
import FormSelectInput from "./FormSelectInput.jsx";

const ProductForm = ({ initialValues, onSubmit }) => {
  const { productLoading } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        price: Yup.number().required("Price is required"),
        stock: Yup.number().required("Stock is required"),
        category: Yup.string().required("Category is required"),
        description: Yup.string().required("Description is required"),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-2 mb-4">
            <FormInput label="Name" type="text" name="name" />
            <FormSelectInput label="Category" name="category">
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </FormSelectInput>
            <FormInput label="Description" type="textarea" name="description" />
            <FormInput label="Price" type="number" name="price" />
            <FormInput label="Stock" type="number" name="stock" />
            <FormInput label="Image" name="images[0]" />
          </div>

          <div className="text-right">
            <Button
              type="submit"
              variant="fill"
              size="sm"
              isLoading={productLoading}
              disabled={!formik.dirty || !formik.isValid}
            >
              Add Product
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
