import { AxiosInstance } from 'axios';
import { LoginUserDto, RegisterUserDto, ResponseCreateUser } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: ResponseCreateUser }>('/auth/register', dto);
    console.log(data);
    
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
});
