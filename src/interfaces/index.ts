export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Test {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

export type UserCreateData = Omit<User, "id">
