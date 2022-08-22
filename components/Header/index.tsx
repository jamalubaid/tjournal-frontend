import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  Paper,
  PaperProps,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  SmsOutlined as MessageIcon,
  NotificationsNoneOutlined as NotificationIcon,
  SearchOutlined as SearchIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAuthVisible,
  selectUserData,
  setAuthVisible,
} from '../../redux/slices/user';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';
import AuthDialog from '../AuthDialog';
import ProfileDialog from '../ProfileDialog';

import styles from './Header.module.scss';

export const Header: FC<PaperProps> = () => {
  const userData = useAppSelector(selectUserData);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([]);

  const dispatch = useAppDispatch();
  const authVisible = useAppSelector(selectAuthVisible);

  const openAuthDialog = () => {
    dispatch(setAuthVisible(true));
  };

  const closeAuthDialog = () => {
    dispatch(setAuthVisible(false));
  };

  useEffect(() => {
    if (userData && authVisible) {
      dispatch(setAuthVisible(false));
    }
  }, [userData, authVisible]);

  const handleChangeInput = async (e) => {
    setSearchValue(e.target.value);
    try {
      const { items } = await Api().post.search({ title: e.target.value });
      setPosts(items);
    } catch (err) {
      console.warn('error', err);
    }
  };

  return (
    <>
      <Paper classes={{ root: styles.root }} elevation={0}>
        <div className="d-flex align-center">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <a>
              <img
                height={35}
                className="mr-20"
                src="/static/img/logo.svg"
                alt="Logo"
              />
            </a>
          </Link>

          <div className={styles.searchBlock}>
            <SearchIcon />
            <input
              value={searchValue}
              onChange={handleChangeInput}
              placeholder="Поиск"
            />
            {posts?.length > 0 && (
              <Paper className={styles.searchBlockPopup}>
                <List>
                  {posts?.map((obj) => (
                    <Link key={obj.id} href={`/news/${obj.id}`}>
                      <a>
                        <ListItem button>{obj.title}</ListItem>
                      </a>
                    </Link>
                  ))}
                </List>
              </Paper>
            )}
          </div>

          {userData ? (
            <Link href="/write">
              <a>
                <Button variant="contained" className={styles.penButton}>
                  Новая запись
                </Button>
              </a>
            </Link>
          ) : (
            <Button
              variant="contained"
              className={styles.penButton}
              onClick={openAuthDialog}
            >
              Новая запись
            </Button>
          )}
        </div>

        <div className="d-flex align-center">
          {userData?.id ? (
            <>
              <IconButton onClick={openAuthDialog}>
                <MessageIcon />
              </IconButton>
              <IconButton>
                <NotificationIcon />
              </IconButton>
              <Link href={`/profile/${userData?.id}`}>
                <a className="d-flex align-center">
                  <Avatar
                    className={styles.avatar}
                    alt="Remy Sharp"
                    src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                  />
                </a>
              </Link>

              <ProfileDialog />
            </>
          ) : (
            <div className={styles.loginButton} onClick={openAuthDialog}>
              <UserIcon />
              Войти
            </div>
          )}

          <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
        </div>
      </Paper>
    </>
  );
};
