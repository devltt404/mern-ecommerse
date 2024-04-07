import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../components/button/Button.jsx";
import FormSelectInput from "../../../../components/form/SelectFormInput.jsx";
import TextFormInput from "../../../../components/form/TextFormInput.jsx";
import { getCategories } from "../../../../redux/actions/categoryAction.js";
import { categorySelector } from "../../../../redux/slices/categorySlice.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";

const ProductForm = ({ initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const { productLoading } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        price: Yup.number().required("Price is required"),
        stock: Yup.number().required("Stock is required"),
        category: Yup.string().required("cCtegory is required"),
        description: Yup.string().required("Description is required"),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="mb-4 flex flex-col gap-2">
            <TextFormInput label="Name" type="text" name="name" />
            <FormSelectInput label="Category" name="category">
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </FormSelectInput>
            <TextFormInput
              label="Description"
              type="textarea"
              name="description"
            />
            <TextFormInput label="Price" type="number" name="price" />
            <TextFormInput label="Stock" type="number" name="stock" />
            <TextFormInput label="Image" name="images[0]" />
          </div>

          <div className="text-right">
            <Button
              type="submit"
              variant="fill"
              size="sm"
              isLoading={productLoading}
              disabled={!formik.dirty || !formik.isValid}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
