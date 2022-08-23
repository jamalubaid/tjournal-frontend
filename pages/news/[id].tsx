import { GetServerSideProps, NextPage } from 'next';

import { FullPost } from '../../components/FullPost';
import { PostComments } from '../../components/PostComments';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

interface FullPostPageProps {
  post: PostItem;
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost
        title={post.title}
        blocks={post.body}
        postId={post.id}
        user={post.user}
        views={post.views}
      />
      <PostComments postId={post.id} />
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.id;
    const post = await Api(ctx).post.getOne(+id);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default FullPostPage;
