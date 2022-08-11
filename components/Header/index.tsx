import React from 'react';
import Link from 'next/link';
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  PaperProps,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import AuthDialog from '../AuthDialog';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/slices/user';

export const Header: React.FC<PaperProps> = () => {
  const [authVisible, setAuthVisible] = React.useState<boolean>(false);
  const router = useRouter();
  const userData = useSelector(selectUserData);
  console.log(userData);

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo" />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>

        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton onClick={openAuthDialog}>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href={`/profile/${userData.id}`}>
            <a className="d-flex align-center">
              <Avatar
                className={styles.avatar}
                alt="Remy Sharp"
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
              />
              <ArrowBottom />
            </a>
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        )}

        <AuthDialog onClose={closeAuthDialog} setAuthVisible={setAuthVisible} visible={authVisible} />
      </div>
    </Paper>
  );
};
