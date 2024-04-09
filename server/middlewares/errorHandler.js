const errorHandler = (err, req, res, next) => {
  console.error(err);
  const message =
    res.statusCode !== 200
      ? err.message
      : "Internal Server Error. Please try again later.";
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const response = { message };
  if (err.detail) {
    response.detail = err.detail;
  }
  res.status(statusCode).json(response);
};

export default errorHandler;
