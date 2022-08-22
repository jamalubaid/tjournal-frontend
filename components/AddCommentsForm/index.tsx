import { Button, Input } from '@material-ui/core';
import React from 'react';
import { Api } from '../../utils/api';
import { CommentItem } from '../../utils/api/types';

import styles from './AddCommentsForm.module.scss';

interface AddCommentFormProps {
  postId?: number;
  onSuccesAdd?: (obj: CommentItem) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, onSuccesAdd }) => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true);

  const onChangeValue = (e) => {
    const value = e.target.value;
    setText(value);
    value.length ? setIsChecked(false) : setIsChecked(true);
  };

  const onAddComment = async () => {
    try {
      const comment = await Api().comment.create({
        postId,
        text,
      });
      onSuccesAdd(comment);
      setText('');
      setClicked(false);
    } catch (error) {}
  };

  return (
    <div className={styles.form}>
      <Input
        onChange={(e) => onChangeValue(e)}
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
        value={text}
        fullWidth
        multiline
      />
      <div className={styles.blockButton}>
        {clicked && (
          <Button
            onClick={onAddComment}
            className={styles.addButton}
            variant="contained"
            disabled={isChecked}
            color="primary"
          >
            Отправить
          </Button>
        )}
      </div>
    </div>
  );
};
