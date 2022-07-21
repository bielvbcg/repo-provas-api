import { Test } from "@prisma/client";
import * as testRepository from "./../repositories/testRepository.js";

export async function createTest(test: Test) {
  await testRepository.createTest(test)
}




export async function getTestsByGroup(test) {
  return
}