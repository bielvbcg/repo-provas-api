export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserCreateData = Omit<User, "id">
