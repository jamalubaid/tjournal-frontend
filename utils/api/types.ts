import { OutputData } from "@editorjs/editorjs";

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

export type PostItem = {
  body: OutputData['blocks'];
  imageUrl?: string;
  createdAt: string;
  description: string;
  user: ResponseCreateUser;
  id: number;
  tags: null;
  title: string;
  updatedAt: string;
  views: number;
}
