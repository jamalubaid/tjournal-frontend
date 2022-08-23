import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, Fragment, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectMenuVisible, setMenuVisible } from '../../../redux/slices/user';
import EntryButton from '../../EntryButton';
import { LeftMenu } from '../../LeftMenu';

import styles from './MobileDialog.module.scss';

const Menu: FC = () => {
  const dispatch = useAppDispatch();
  const menuVisible = useAppSelector(selectMenuVisible);

  const openMenuDialog = () => dispatch(setMenuVisible(true));
  const closeMenuDialog = () => dispatch(setMenuVisible(false));
  const toggleMenuDialog = () => dispatch(setMenuVisible(!menuVisible));

  return (
    <>
      <IconButton onClick={toggleMenuDialog}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={menuVisible}
        onClose={closeMenuDialog}
        onOpen={openMenuDialog}
      >
        <div
          className={clsx(styles.list, styles.sidebar)}
          role="presentation"
          onClick={toggleMenuDialog}
        >
          <List className={styles.header}>
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
          </List>
          <List>
            <LeftMenu />
          </List>
          <Divider />
          <List style={{ marginTop: 10 }}>
            <EntryButton />
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
