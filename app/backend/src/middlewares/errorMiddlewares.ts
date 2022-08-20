import { ErrorRequestHandler } from 'express';

const errorMiddlewares: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message, details } = err;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

export default errorMiddlewares;
