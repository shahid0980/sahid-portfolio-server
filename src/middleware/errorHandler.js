export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { message: "Route not found." }
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.statusCode || 500;
  const message =
    status >= 500 ? "Something went wrong. Please try again." : error.message;

  res.status(status).json({
    success: false,
    error: { message }
  });
}
