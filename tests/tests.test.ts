import app from '../src/app.js'
import supertest from 'supertest'
import { prisma } from "../src/database.js"
import * as factory from './factories'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests";`;
});

describe('POST /tests', () => {

  const test = factory.test.validTest()
  const invalidTest = factory.test.invalidTest()
  console.log(test)

  it('should return 201 when test is created', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(test)
    expect(response.status).toBe(201)
  })

  it('should return 401 given no token', async () => {
    const response = await supertest(app)
      .post('/tests')
      .send(test)
    expect(response.status).toBe(401)
  })

  it('should return 401 given invalid token', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer invalidToken${token}`)
      .send(test)
    expect(response.status).toBe(401)
  })

  it('should return 422 given invalid data', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidTest)
    expect(response.status).toBe(422)
  })

})

describe('GET /tests/disciplines', () => {

  it('should return 200 given valid credentials', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/tests/disciplines')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('should return 401 given no token', async () => {
    const response = await supertest(app)
      .get('/tests/disciplines')
    expect(response.status).toBe(401)
  });

  it('should return 401 given invalid token', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/tests/disciplines')
      .set('Authorization', `Bearer invalidToken${token}`)
    expect(response.status).toBe(401)
  });
})

describe('GET /tests/teachers', () => {

  it('should return 200 given valid credentials', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/tests/teachers')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('should return 401 given no token', async () => {
    const response = await supertest(app)
      .get('/tests/teachers')
    expect(response.status).toBe(401)
  });

  it('should return 401 given invalid token', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/tests/teachers')
      .set('Authorization', `Bearer invalidToken${token}`)
    expect(response.status).toBe(401)
  });
})

describe('GET /categories', () => {

  it('should return 200 given valid credentials', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('should return 401 given no token', async () => {
    const response = await supertest(app)
      .get('/categories')
    expect(response.status).toBe(401)
  });

  it('should return 401 given invalid token', async () => {
    const token = await factory.user.getAuthToken()
    const response = await supertest(app)
      .get('/categories')
      .set('Authorization', `Bearer invalidToken${token}`)
    expect(response.status).toBe(401)
  });
})

afterAll(async () => {
  await prisma.$disconnect()
});