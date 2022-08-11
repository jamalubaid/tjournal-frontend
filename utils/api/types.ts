export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = {
  fullName: string;
} & LoginUserDto;

export type ResponseCreateUser = {
  createAt?: string;
  updateAt?: string;
  email: string;
  fullName: string;
  id?: number;
  token?: string;
};
