export interface ICurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthDate: string;
  avatar: string;
  isActive: boolean;
}

export interface ILoginPayload {
  username: string;
  password: string;
}
