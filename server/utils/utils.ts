export function errorHandler(err, _, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    errorType: 'ServerError',
    message: 'Internal server error',
  });
}
