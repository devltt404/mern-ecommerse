import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../../components/button/Button.jsx";
import SelectFormInput from "../../../../components/form/SelectFormInput.jsx";
import TextFormInput from "../../../../components/form/TextFormInput.jsx";
import { getCategories } from "../../../../redux/actions/categoryAction.js";
import { categorySelector } from "../../../../redux/slices/categorySlice.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";

import { useForm } from "react-hook-form";
import TextareaFormInput from "../../../../components/form/TextareaFormInput.jsx";

const ProductForm = ({ defaultValues, onSubmit }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { productLoading } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col gap-4">
        <TextFormInput control={control} label="Name" type="text" name="name" />
        <SelectFormInput
          label="Category"
          name="category"
          defaultValue="category"
          control={control}
          options={categories.map((category) => {
            return {
              value: category._id,
              label: category.name,
            };
          })}
          error={errors.category}
        />
        <TextareaFormInput
          control={control}
          label="Description"
          type="textarea"
          name="description"
        />
        <TextFormInput
          control={control}
          label="Price"
          type="number"
          name="price"
        />
        <TextFormInput
          control={control}
          label="Stock"
          type="number"
          name="stock"
        />
        <TextFormInput control={control} label="Image" name="images[0]" />
      </div>

      <div className="text-right">
        <Button
          type="submit"
          variant="fill"
          size="sm"
          isLoading={productLoading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
