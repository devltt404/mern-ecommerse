const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const message =
    res.statusCode !== 200 ? err.message : "Internal Server Error";
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
