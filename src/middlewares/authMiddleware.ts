import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "../setup.js"

import { findUserById } from "../services/userService.js";

export async function ensureAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction) {

  const authorization = req.headers["authorization"];
  if (!authorization) throw { type: "unauthorized", message: "Missing authorization header" }

  const token = authorization.replace("Bearer ", "");
  if (!token) throw { type: "unauthorized", message: "Missing token" }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await findUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw { type: "unauthorized", message: "Invalid token" }
  }
}
