function errorHandler(err, req, res, next) {

  if(err.name === 'ValidationError') {
    err.status = 422;
    err.message = 'Unprocessable Entity';

    const errors = {};
    for(const key in err.errors) {
      errors[key] = err.errors[key].message;
    }
    err.errors = errors;
  }

  if(err.name === 'CastError') {
    err.status = 404;
    err.message = 'Not Found';
  }

  if(err.message === 'jwt expired') {
    err.status = 401;
    err.message = 'Session has timed out';
  }

  err.message = err.message || 'Internal Server Error';
  err.status = err.status || 500;

  res.status(err.status).json({ message: err.message, errors: err.errors });

  next(err);
}

module.exports = errorHandler;
