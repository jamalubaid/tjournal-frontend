import {
  Avatar,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Add,
  ExpandMoreOutlined as ArrowBottom,
  Settings,
} from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { FC, MouseEvent, useState } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { Api } from '../../utils/api';

import styles from './PostDialog.module.scss';

interface PostDialogProps {
  id: number;
}

const PostDialog: FC<PostDialogProps> = ({ id }) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userData = useAppSelector(selectUserData);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePost = async () => {
    try {
      setIsLoading(true);
      await Api().post.remove(id);
    } catch (error) {
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
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
        <MenuItem onClick={handleClose} className={styles.item}>
          <Link href={`/write/${id}`}>
            <a className={styles.item}>
              {/*<Add />*/}
              <div>Редактировать</div>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={deletePost}>
          <>
            <div className={styles.item}>
              <Settings />
              <div>Удалить</div>
            </div>
          </>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostDialog;
