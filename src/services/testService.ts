import { Test } from "@prisma/client";
import { TestCreateData } from "../interfaces";
import * as testRepository from "./../repositories/testRepository.js";

export async function createTest(test: TestCreateData) {
  await testRepository.createTest(test)
}

export async function getCategories() {
  return await testRepository.getCategories()
}

export async function getTestsByDisciplines() {
  return await testRepository.getTestsByDisciplines()
}

export async function getTestsByTeachers() {
  return await testRepository.getTestsByTeachers()
}