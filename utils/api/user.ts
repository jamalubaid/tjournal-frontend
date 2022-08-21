import { AxiosInstance } from 'axios';
import { LoginUserDto, RegisterUserDto, ResponseCreateUser, UpdateUserDto } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<RegisterUserDto>('/users');
    return data;
  },
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: ResponseCreateUser }>('/auth/register', dto);
    return data;
  },
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: ResponseCreateUser }>('/auth/login', dto);
    return data;
  },
  async getMe() {
    const { data } = await instance.get<ResponseCreateUser>('/users/me');
    return data;
  },
  async update(dto: UpdateUserDto) {
    const { data } = await instance.patch(`/users/me`, dto);
    return data;
  },
});
