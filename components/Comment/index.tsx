import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { ResponseCreateUser } from '../../utils/api/types';
import { Api } from '../../utils/api';

interface CommentPostProps {
  id: number;
  user: ResponseCreateUser;
  text: string;
  createAt: string;
  currentUserId: number;
  onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({ id, user, text, createAt, currentUserId, onRemove }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm('Вы действительно хотите удалить комменитарий ?')) {
      try {
        await Api().comment.remove(id);
        onRemove(id);
      } catch (err) {
        console.warn('Error remove comment', err);
        alert('Не удалось удалить комментарий');
      } finally {
        handleClose();
      }
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar>{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>

      {user.id === currentUserId && (
        <>
          <span className={styles.replyBtn}>Ответить</span>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} elevation={2} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
            <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
            <MenuItem onClick={handleClose}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
