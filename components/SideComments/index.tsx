import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import clsx from 'clsx';
import { useState } from 'react';

import { useComments } from '../../hooks/useComment';

import { CommentItem } from './CommentItem';
import styles from './SideComments.module.scss';

export const SideComments = () => {
  const { comments } = useComments();
  const [visible, setVisible] = useState(true);

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
