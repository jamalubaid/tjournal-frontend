import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';

import { PostItem } from './types';

type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
};

type SearchPostDto = {
  fullName?: string;
  email?: string;
  limit?: number;
  take?: number;
  views?: 'DESC' | 'ASC';
  body?: string;
  title?: string;
  tag?: string;
};

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<PostItem[]>('/posts');
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<PostItem>(`/posts/${id}`);
    return data;
  },
  async search(query: SearchPostDto) {
    const { data } = await instance.get<{ items: PostItem[]; totla: number }>(
      `/posts/${query.title.length ? 'search' : ''}`,
      {
        params: query,
      }
    );
    return data;
  },

  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostItem }>(
      '/posts',
      dto
    );
    return data;
  },
  async update(dto: CreatePostDto, id: number) {
    const { data } = await instance.patch<CreatePostDto, { data: PostItem }>(
      `/posts/${id}`,
      dto
    );
    return data;
  },
});
