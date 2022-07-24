import { prisma } from "../database.js"
import { Test } from "@prisma/client"
import { TestCreateData } from "../interfaces";

export async function createTest(test: TestCreateData) {
  return await prisma.test.create({
    data: test
  })
}

export async function getCategories() {
  return await prisma.category.findMany()
}

export async function getTestsByTeachers() {
  return await prisma.teachersDisciplines.findMany({
    include: {
      discipline: true,
      teacher: true,
      test: true
    }
  })
}

export async function getTestsByDisciplines() {
  return await prisma.term.findMany({
    include: {
      discipline: {
        include: {
          teachersDisciplines: {
            include: {
              teacher: true,
              test: true
            }
          }
        }
      }
    }
  })
}