import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../../redux/actions/productAction.js";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextareaFormInput from "../../../../components/form/TextareaFormInput.jsx";
import {
  Button,
  RatingFormInput,
  TextFormInput,
} from "../../../../components/index.js";
import { productSelector } from "../../../../redux/slices/productSlice.js";

const AddReview = () => {
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    rating: Yup.number().required("Rating is required"),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      content: "",
      rating: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addReview(data));
  };

  const dispatch = useDispatch();
  const { productLoading } = useSelector(productSelector);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-4"
    >
      <RatingFormInput control={control} name="rating" />
      <TextFormInput
        control={control}
        name="title"
        label="Title"
        placeholder="Enter review title"
      />
      <TextareaFormInput
        control={control}
        name="content"
        label="Content"
        placeholder="Enter review title"
      />

      <Button className="my-2" type="submit" variant="fill" isLoading={productLoading}>
        Submit
      </Button>
    </form>
  );
};

export default AddReview;
