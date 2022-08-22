import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';

import { CommentApi } from './comment';
import { PostApi } from './post';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.rtoken;

  const instance = axios.create({
    baseURL: process.env.LOCAL_URL,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  // const result = Object.entries(api).reduce((prev, [key, f]) => {
  //   return {
  //     ...prev,
  //     [key]: f(instance),
  //   };
  // }, {} as ApiReturnType);

  return {
    user: UserApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
  };
};
