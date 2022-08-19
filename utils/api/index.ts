import Cookies, { parseCookies } from 'nookies';
import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { UserApi } from './user';
import { PostApi } from './post';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.rtoken;

  const instance = axios.create({
    baseURL: 'http://localhost:6200',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  // const result = Object.entries(apis).reduce((prev, [key, f]) => {
  //   return {
  //     ...prev,
  //     [key]: f(instance),
  //   };
  // }, {} as ApiReturnType);

  return {
    user: UserApi(instance),
    post: PostApi(instance),
  };
};
