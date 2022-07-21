import { Request, Response } from "express";
import * as testService from "../services/testService.js"

export async function createTest(req: Request, res: Response) {
  const test = req.body

  await testService.createTest(test)
  res.sendStatus(201);
}

export async function getTestsByGroup(req: Request, res: Response) {
  res.sendStatus(200);
}
