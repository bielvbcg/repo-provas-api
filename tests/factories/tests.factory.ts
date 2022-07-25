import { faker } from "@faker-js/faker";

export function validTest() {
  return {
    name: faker.lorem.sentence(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teachersDisciplinesId: 1,
  };
}

export function invalidTest() {
  return {
    name: faker.random.numeric(),
    pdfUrl: faker.lorem.sentence(),
    categoryId: -1,
    teachersDisciplinesId: -1,
  };
}