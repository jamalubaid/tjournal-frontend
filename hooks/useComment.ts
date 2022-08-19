import React, { SetStateAction } from 'react';
import { Api } from '../utils/api';
import { CommentItem } from '../utils/api/types';

type UseCommentsProps = {
  comments: CommentItem[];
  setComments: React.Dispatch<SetStateAction<CommentItem[]>>;
};

export const useComments = (postId?: number): UseCommentsProps => {
  const [comments, setComments] = React.useState<CommentItem[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const arr = await Api().comment.getAll(postId);
        setComments(arr);
      } catch (error) {
        console.warn('Error comment', error);
        alert('Не удалось добавить комментарий');
      }
    })();
  }, []);

  return { comments, setComments };
};
