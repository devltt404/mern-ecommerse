import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { addReview } from "../../../../redux/actions/productAction.js";

import {
  Button,
  RatingFormInput,
  TextFormInput,
} from "../../../../components/index.js";

const AddReview = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        rating: 0,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title is required";
        }
        if (!values.content) {
          errors.content = "Content is required";
        }
        if (values.rating == 0) {
          errors.rating = "Rating is required";
        }
        return errors;
      }}
      onSubmit={({ title, content, rating }) => {
        dispatch(addReview({ title, content, rating }));
      }}
    >
      {(formik) => (
        <Form className="my-2 flex flex-col gap-2">
          <RatingFormInput name="rating" />
          <TextFormInput
            name="title"
            label="Title"
            placeholder="Enter review title"
          />
          <TextFormInput
            type="textarea"
            name="content"
            label="Content"
            placeholder="Enter review title"
          />

          <Button
            type="submit"
            variant="fill"
            disabled={
              Object.keys(formik.touched).length == 0 ||
              Object.keys(formik.errors).length > 0
            }
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddReview;
