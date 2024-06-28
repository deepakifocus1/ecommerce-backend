export const globalErrHandler = (err, req, res, next) => {
  const stack = err?.stack;
  const status = err?.stausCode ? err?.statusCode : 500;
  const message = err?.message;
  res.status(status).json({
    stack,
    message,
  });
};

export const notFound = (req, res, next) => {
  const err = Error(`Route ${req.originalUrl} not found`);
  next(err);
};
