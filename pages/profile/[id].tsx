import { Avatar, Button, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { TextsmsOutlined as MessageIcon, SettingsOutlined as SettingsIcon } from '@material-ui/icons';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';



import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { Api } from '../../utils/api';
import { PostItem, ResponseCreateUser } from '../../utils/api/types';


interface IPostProps {
  post: PostItem;
  user: ResponseCreateUser;
}

const Profile: NextPage<IPostProps> = ({ post, user }) => {
  const userData = useAppSelector(selectUserData);

  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
        <div className="d-flex justify-between">
          <div>
            <Avatar
              style={{ width: 120, height: 120, borderRadius: 6 }}
              src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
            />
            <Typography
              style={{ fontWeight: 'bold' }}
              className="mt-10"
              variant="h4"
            >
              {userData?.fullName}
            </Typography>
          </div>
          <div>
            <Link href="/profile/settings">
              <Button
                style={{ height: 42, minWidth: 45, width: 45, marginRight: 10 }}
                variant="contained"
              >
                <SettingsIcon />
              </Button>
            </Link>

            <Button style={{ height: 42 }} variant="contained" color="primary">
              <MessageIcon className="mr-10" />
              Написать
            </Button>
          </div>
        </div>
        <div className="d-flex mb-10 mt-10">
          <Typography
            style={{ fontWeight: 'bold', color: '#35AB66' }}
            className="mr-15"
          >
            +{userData?.commentsCount * 2}
          </Typography>
          <Typography>2 подписчика</Typography>
        </div>
        <Typography>На проекте с {userData?.createdAt.slice(0, 10)}</Typography>

        <Tabs
          className="mt-20"
          value={0}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Статьи" />
          <Tab label="Комментарии" />
          <Tab label="Закладки" />
        </Tabs>
      </Paper>

      <div className="d-flex align-start">
        <div className="mr-20 flex">{post && <Post {...post} />}</div>
        <Paper style={{ width: 300 }} className="p-20 mb-20" elevation={0}>
          <b>Подписчики</b>
          <div className="d-flex mt-15">
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
            <Avatar
              className="mr-10"
              src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
            />
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.id;
    const post = await Api(ctx).post.getOne(+id);
    const user = await Api(ctx).user.getMe();

    if (!post && post.user.id !== user[0].id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        post,
        user,
      },
    };
  } catch (error) {
    console.log('profileError', error);

    return {
      props: {},
      // redirect: {
      //   destination: '/',
      //   permanent: false,
      // },
    };
  }
};