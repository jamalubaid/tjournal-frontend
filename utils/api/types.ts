import { OutputData } from '@editorjs/editorjs';

export type LoginUserDto = {
  email: string;
  password: string;
};

export type UpdateUserDto = {
  fullName: string;
  password: string;
  id?: number;
};

export type RegisterUserDto = {
  fullName: string;
} & LoginUserDto;

export type ResponseCreateUser = {
  createdAt?: string;
  updatedAt?: string;
  email: string;
  fullName: string;
  commentsCount?: number;
  comments?: CommentItem[];
  id?: number;
  token?: string;
  password?: string;
  posts: PostItem[];
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
};

export type CommentItem = {
  id: number;
  text: string;
  post: PostItem;
  user: ResponseCreateUser;
  createdAt: string;
  updatedAt: string;
};
