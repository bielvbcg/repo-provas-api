import { prisma } from "../database.js"
import { UserCreateData } from "../interfaces/index.js"

export async function insertUser(user: UserCreateData) {
  await prisma.user.create({
    data: user
  })
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}