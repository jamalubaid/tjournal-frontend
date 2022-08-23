import {
  Avatar,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  TextsmsOutlined as MessageIcon,
  SettingsOutlined as SettingsIcon,
} from '@material-ui/icons';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

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
  const { push } = useRouter();
  const isWideScreen = useMediaQuery('(max-width:767px)');
  console.log(post, user);

  const logout = () => {
    setCookie(null, 'rtoken', '', {
      path: '/',
    });
    push('/').catch();
  };
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
              {user?.id === userData?.id ? userData?.fullName : user?.fullName}
            </Typography>
          </div>
          <div>
            {user?.id === userData?.id ? (
              <>
                <Link href="/profile/settings">
                  <Button
                    style={{
                      height: 42,
                      minWidth: 45,
                      width: 45,
                      marginRight: 10,
                    }}
                    variant="contained"
                  >
                    <SettingsIcon />
                  </Button>
                </Link>
                <Button
                  style={{
                    height: 42,
                    minWidth: 45,
                    width: 45,
                    marginRight: 10,
                  }}
                  variant="contained"
                  color="inherit"
                  onClick={logout}
                >
                  <svg
                    style={{ height: 25, minWidth: 45, width: 25 }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                </Button>
              </>
            ) : (
              <div>
                <Button variant="contained" className="mr-15" disabled>
                  <MessageIcon />
                </Button>
                <Button variant="contained" disabled>
                  <UserAddIcon />
                  <b className="ml-10">Подписаться</b>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex mb-10 mt-10">
          <Typography
            style={{ fontWeight: 'bold', color: '#35AB66' }}
            className="mr-15"
          >
            +
            {user?.id === userData?.id
              ? userData?.commentsCount * 2
              : user?.commentsCount * 2}
          </Typography>
          {/* <Typography>2 подписчика</Typography> */}
        </div>
        <Typography>
          На проекте с
          {user?.id === userData?.id
            ? userData?.createdAt.slice(0, 10)
            : user?.createdAt.slice(0, 10)}
        </Typography>

        <Tabs
          className="mt-20"
          value={0}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Статьи" />
          <Tab label="Комментарии" disabled />
          <Tab label="Закладки" disabled />
        </Tabs>
      </Paper>

      <div className="d-flex align-start">
        <div className={!isWideScreen ? 'mr-20 flex' : 'flex'}>
          {post && <Post {...post} />}
        </div>
        {!isWideScreen && (
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
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { user: userData } = await Api(ctx).post.getOne(+id);
    const post = await Api(ctx).post.getOne(+userData?.id);
    const userOne = await Api(ctx).user?.getOne(+id);

    return {
      props: { post, user: userOne[0] },
    };
  } catch (error) {
    console.log('profileError', error);

    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
