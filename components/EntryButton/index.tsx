import { Avatar, Button, useMediaQuery } from '@material-ui/core';
import { AccountCircleOutlined as UserIcon } from '@material-ui/icons';
import Link from 'next/link';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserData, setAuthVisible } from '../../redux/slices/user';
import ProfileDialog from '../ProfileDialog';

import styles from './EntryButton.module.scss';

const EntryButton: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const isWideScreen = useMediaQuery('(max-width:767px)');
  const openAuthDialog = () => {
    dispatch(setAuthVisible(true));
  };

  return userData ? (
    <Link href="/write">
      <a>
        <Button variant="contained" className={styles.penButton}>
          {!isWideScreen ? 'Новая запись ' : '+'}
        </Button>
      </a>
    </Link>
  ) : (
    <Button
      variant="contained"
      className={styles.penButton}
      onClick={openAuthDialog}
    >
      {!isWideScreen ? 'Новая запись ' : '+'}
    </Button>
  );
};

export default EntryButton;
