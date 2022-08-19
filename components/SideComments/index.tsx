import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComment';

export const SideComments = () => {
  const { comments } = useComments();
  const [visible, setVisible] = React.useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {!visible && comments.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};
