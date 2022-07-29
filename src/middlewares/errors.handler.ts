import { ValidationError } from 'sequelize'
import { Request, Response, NextFunction} from "express";

export const logErrors = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
  console.error(err)
  return next(err)
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const error = {
    name: err.name,
    msg: err.message,
    // stack: err.stack
  }
  return res.status(400).json(error)
}

export const ormErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const error = {
      name: err.name,
      msg: err.errors[0].message,
      error: err.errors
    }
    res.status(409).json(error)
  }

  return next(err)
}

export const error404 = (_req: Request, res: Response) => {
  const error = {
    name: 'NotFound',
    msg: 'Not Found'
  }
  res.status(404).json(error)
}
