export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teachersDisciplinesId: number;
}

export type GroupTypes =
  | 'teachers'
  | 'disciplines'
  ;

export type UserCreateData = Omit<User, "id">
export type TestCreateData = Omit<Test, "id">
