import { Request, Response } from "express";
import * as testService from "../services/testService.js"
import { GroupTypes } from "../interfaces";


export async function createTest(req: Request, res: Response) {
  const test = req.body
  await testService.createTest(test)
  res.sendStatus(201);
}

export async function getCategories(req: Request, res: Response) {
  const categories = await testService.getCategories()
  res.send(categories)
}

export async function getTestsByDisciplines(req: Request, res: Response) {
  const tests = await testService.getTestsByDisciplines()
  res.send(tests);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const tests = await testService.getTestsByTeachers()
  res.send(tests);
}
