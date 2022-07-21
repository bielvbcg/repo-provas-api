import { UserCreateData } from "../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../setup.js"

import * as userRepository from "../repositories/userRepository.js"

export async function signUp(user: UserCreateData) {
  const result = await userRepository.findUserByEmail(user.email)

  if (result) {
    throw { type: "conflict", message: "usuario ja cadastrado" }
  }

  const SALT = 10
  const hashedPassword = bcrypt.hashSync(user.password, SALT)
  await userRepository.insertUser({ ...user, password: hashedPassword })
}

export async function signIn(login: UserCreateData) {
  const user = await getUserOrFail(login);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

export async function getUserOrFail(login: UserCreateData) {
  const user = await userRepository.findUserByEmail(login.email);
  if (!user) throw { type: "unauthorized", message: "Invalid credentials" }

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw { type: "unauthorized", message: "Invalid credentials" }

  return user;
}

export async function findUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw { type: "not_found", message: "User not found" }

  return user;
}