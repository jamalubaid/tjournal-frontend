import { Button, Input } from '@material-ui/core';
import React from 'react';

import styles from './AddCommentsForm.module.scss';

export const AddCommentForm = () => {
  const [clicked, setClicked] = React.useState(false);
  const [values, setValues] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true);

  const onChangeValue = (e) => {
    const value = e.target.value;
    setValues(value);
    value.length ? setIsChecked(false) : setIsChecked(true);
  };

  const onAddComment = () => {
    setValues('');
    setClicked(false);
  };

  return (
    <div className={styles.form}>
      <Input
        onChange={(e) => onChangeValue(e)}
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
        value={values}
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
