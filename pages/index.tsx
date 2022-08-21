import { NextPage } from 'next';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

export interface IPostProps {
  posts: PostItem[];
}

const Home: NextPage<IPostProps> = ({ posts }) => {
  console.log(posts);

  return (
    <MainLayout>
      {posts?.map((obj) => (
        <Post key={obj.id} {...obj} />
      ))}
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.warn('error', error);
  }

  return {
    props: {
      posts: [],
    },
  };
};
