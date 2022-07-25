import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserCreateData } from "../../src/interfaces/index.js";
import dotenv from 'dotenv'

dotenv.config()

export function validUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export async function createUser(user: UserCreateData) {
  const { email, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10)
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    },
  });
  return createdUser;
}

export async function getAuthToken() {
  const user = await createUser(validUser());
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
  return token;
}