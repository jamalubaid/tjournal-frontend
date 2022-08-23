import {
  Avatar,
  BottomNavigationAction,
  Button,
  BottomNavigation as Navigation,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Add,
  ExpandMoreOutlined as ArrowBottom,
  Home,
  Markunread,
  Person,
  Settings,
} from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData, setAuthVisible } from '../../../redux/slices/user';

import styles from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  const [value, setValue] = React.useState('recents');
  const userData = useAppSelector(selectUserData);
  const isWideScreen = useMediaQuery('(max-width:767px)');
  const dispatch = useAppDispatch();

  const openAuthDialog = () => {
    dispatch(setAuthVisible(true));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Navigation value={value} onChange={handleChange} className={styles.root}>
      <BottomNavigationAction
        className={styles.icon}
        icon={
          <Link href="/">
            <a className="d-flex align-center">
              <Home />
            </a>
          </Link>
        }
      />
      <BottomNavigationAction
        className={styles.icon}
        icon={
          userData ? (
            <Link href="/write">
              <a>
                <Add />
              </a>
            </Link>
          ) : (
            <Button
              variant="contained"
              className={styles.penButton}
              onClick={openAuthDialog}
            >
              <Add />
            </Button>
          )
        }
      />

      <BottomNavigationAction
        className={styles.icon}
        icon={
          userData ? (
            <Link href="/profile/settings">
              <a>
                <Settings />
              </a>
            </Link>
          ) : (
            <Button
              variant="contained"
              className={styles.penButton}
              onClick={openAuthDialog}
            >
              <Settings />
            </Button>
          )
        }
      />
      <BottomNavigationAction
        className={styles.icon}
        icon={
          userData ? (
            <Link href={`/profile/${userData?.id}`}>
              <a className="d-flex align-center">
                <Person />
              </a>
            </Link>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              onClick={openAuthDialog}
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
              </g>
            </svg>
          )
        }
      />
    </Navigation>
  );
};

export default BottomNavigation;
