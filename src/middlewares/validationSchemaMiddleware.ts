import { Request, Response, NextFunction } from "express"
import { Schema } from "joi"

export function validateSchemaMiddleware(schema: Schema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    if (error) {
      res.sendStatus(422)
    }
    next();
  };
}