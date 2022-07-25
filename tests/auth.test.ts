import app from '../src/app.js'
import supertest from 'supertest'
import { prisma } from "../src/database.js"
import * as factory from './factories'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users";`;
})

describe('POST /sign-up', () => {

  const user = factory.user.validUser()

  it('should return status 201 when user is created', async () => {
    const response = await supertest(app)
      .post('/sign-up')
      .send(user)
    expect(response.status).toBe(201)
  })

  it('should return a status 409 when email already exists', async () => {
    await factory.user.createUser(user)
    const response = await supertest(app)
      .post('/sign-up')
      .send(user)
    expect(response.status).toBe(409)
  })
})

describe('POST /sign-In', () => {

  const userData = factory.user.validUser()
  const invalidUserData = factory.user.validUser()
  const wrongPassword = { ...userData, password: invalidUserData.password }

  it('should return 200 when user has signed in', async () => {
    const user = await factory.user.createUser(userData)
    const response = await supertest(app).post('/sign-in').send(userData)
    expect(response.status).toBe(200)
  })
  it('should return a token', async () => {
    const user = await factory.user.createUser(userData)
    const response = await supertest(app).post('/sign-in').send(userData)
    expect(response.body.token).toBeDefined()
  });
  it('should return 401 if the email does not exist', async () => {
    const user = await factory.user.createUser(userData)
    const response = await supertest(app).post('/sign-in').send(invalidUserData)
    expect(response.status).toBe(401)
  })
  it('should return 401 if the password is wrong', async () => {
    const user = await factory.user.createUser(userData)
    const response = await supertest(app).post('/sign-in').send(wrongPassword)
    expect(response.status).toBe(401)
  })
})

afterAll(async () => {
  await prisma.$disconnect();
});