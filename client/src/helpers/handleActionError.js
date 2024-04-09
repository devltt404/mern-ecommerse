import { toast } from "react-hot-toast";

export const handleActionError = (
  dispatch,
  error,
  setError,
  showToast = false,
) => {
  if (!import.meta.env.PROD) {
    console.log(error);
  }

  const msg =
    error.response?.data?.message ||
    (import.meta.env.PROD
      ? "There was an unexpected error. Please try again later."
      : error.message);

  const err = { message: msg };
  if (error.response?.data?.detail) err.detail = error.response.data.detail;
  dispatch(setError(err));
  if (showToast) toast.error(err.message);
};
