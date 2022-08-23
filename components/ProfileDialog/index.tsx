import { Avatar, Button, Fade, Menu, MenuItem } from '@material-ui/core';
import {
  Add,
  ExpandMoreOutlined as ArrowBottom,
  Settings,
} from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { FC, MouseEvent, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

import styles from './ProfileDialog.module.scss';

const ProfileDialog: FC = () => {
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userData = useAppSelector(selectUserData);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setCookie(null, 'rtoken', '', {
      path: '/',
    });
    push('/').catch();
  };
  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowBottom />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableScrollLock={true}
        className={styles.content}
      >
        <div className={styles.title}>
          <b>Мой профиль</b>
        </div>
        <MenuItem onClick={handleClose} className={styles.item}>
          <Link href={`/profile/${userData?.id}`}>
            <a className={styles.item}>
              <Avatar
                alt="Remy Sharp"
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
              />
              {userData?.fullName}
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.item}>
          <Link href={`/write`}>
            <a className={styles.item}>
              <Add />
              <div>Создать блог</div>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={`/profile/settings`}>
            <a className={styles.item}>
              <Settings />
              <div>Настройки</div>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={logout} className={styles.item}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="38"
            viewBox="0 0 24 24"
            width="38"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDialog;
