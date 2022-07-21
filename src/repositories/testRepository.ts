import { prisma } from "../database.js"
import { Test } from "@prisma/client"

export async function createTest(test: Test) {
  return prisma.test.create({
    data: test
  })
}