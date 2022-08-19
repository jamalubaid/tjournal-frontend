import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { WriteForm } from '../../components/WriteForm';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

interface IPostProps {
  post: PostItem;
}

const WritePage: NextPage<IPostProps> = ({ post }) => {
  return (
    <MainLayout hideComments hideMenu className="main-layout-white">
      <WriteForm data={post} />
    </MainLayout>
  );
};

export default WritePage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const id = ctx.params.id;
    const post = await Api(ctx).post.getOne(+id);
    const user = await Api(ctx).user.getMe();

    if (post.user.id !== user.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return {
      props: {
        post
      }
    }
  } catch (error) {
    return {
      props: {}, 
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}