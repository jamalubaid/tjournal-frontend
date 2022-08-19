import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';
import { CommentItem, PostItem } from './types';

type CreateCommentDto = {
  postId: number;
  text: string;
};

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId: number) {
    const { data } = await instance.get<CommentItem[]>('/comments', { params: { postId } });
    return data;
  },
  async create(dto: CreateCommentDto) {
    console.log(dto);
    const { data } = await instance.post<CreateCommentDto, { data: CommentItem }>('/comments', dto);
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete('/comments/' + id);
    return data;
  },
});
