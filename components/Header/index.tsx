import { Avatar, Paper, PaperProps, useMediaQuery } from '@material-ui/core';
import {
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
import AuthDialog from '../AuthDialog';
import EntryButton from '../EntryButton';
import Menu from '../Mobile/Menu';
import ProfileDialog from '../ProfileDialog';
import { SearchBlock } from '../SearchBlock';

import styles from './Header.module.scss';

export const Header: FC<PaperProps> = () => {
  const [toggleSearchInput, setToggleSearchInput] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const authVisible = useAppSelector(selectAuthVisible);
  const userData = useAppSelector(selectUserData);

  const isWideScreen = useMediaQuery('(max-width:767px)');

  const openAuthDialog = () => dispatch(setAuthVisible(true));
  const closeAuthDialog = () => dispatch(setAuthVisible(false));

  const handleSearchInput = () => {
    setToggleSearchInput(!toggleSearchInput);
  };

  useEffect(() => {
    if (userData && authVisible) dispatch(setAuthVisible(false));
  }, [userData, authVisible]);

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className={styles.right}>
        <div className="d-flex align-center">
          <Menu />
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
        </div>

        <div className={styles.searchWrapper}>
          {isWideScreen ? (
            <SearchIcon onClick={handleSearchInput} className={styles.search} />
          ) : (
            <></>
          )}
          {isWideScreen && toggleSearchInput ? <SearchBlock /> : null}
          {!isWideScreen ? <SearchBlock /> : null}
          <EntryButton />
        </div>
      </div>

      {!isWideScreen && (
        <div className="d-flex align-center">
          {userData?.id ? (
            <>
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
        </div>
      )}
      <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
