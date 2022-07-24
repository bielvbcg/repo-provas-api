import { Request, Response, NextFunction } from "express";

type ErrorTypes =
  | 'bad_request'
  | 'unauthorized'
  | 'not_found'
  | 'conflict'
  | 'unprocessable_entity'
  ;

export interface Errors {
  type: ErrorTypes,
  message: string
}

async function errorHandler(error: Errors, req: Request, res: Response, next: NextFunction) {
  if (error.type === "conflict") {
    return res.status(409).send(error.message)
  }

  if (error.type === "unauthorized") {
    return res.status(401).send(error.message)
  }

  console.log(error)
  res.sendStatus(500)
}

export default errorHandler