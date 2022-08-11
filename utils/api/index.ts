import axios from 'axios';
import { LoginUserDto, RegisterUserDto, ResponseCreateUser } from './types';

const instance = axios.create({
  baseURL: 'http://localhost:5200',
});

export const UserApi = {
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: ResponseCreateUser }>('/auth/register', dto);
    return data;
  },
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: ResponseCreateUser }>('/auth/login', dto);
    return data;
  },
};
