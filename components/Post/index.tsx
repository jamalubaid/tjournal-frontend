import { Paper, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Link from 'next/link';
import { FC } from 'react';

import { useAppSelector } from '../../redux/hooks';
import { PostItem } from '../../utils/api/types';
import { PostActions } from '../PostActions';
import PostDialog from '../PostDialog';

import styles from './Post.module.scss';

export const Post: FC<PostItem> = ({
  title,
  imageUrl,
  id,
  body,
  user: postUser,
  ...rest
}) => {
  const { data: user } = useAppSelector((state) => state.user);

  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <div className={styles.top}>
        <Typography variant="h5" className={styles.title}>
          <Link href={`/news/${id}`}>
            <a>{title}</a>
          </Link>
        </Typography>
        {user?.id === postUser?.id && <PostDialog id={id} />}
      </div>
      <div className={styles.text}>
        {body?.map((obj) => {
          return (
            <Typography
              key={obj.id}
              className="mt-10 mb-15"
              dangerouslySetInnerHTML={{ __html: obj.data.text }}
            />
          );
        })}
      </div>
      {imageUrl && (
        <img
          src="https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"
          height={500}
          width={600}
        />
      )}
      <PostActions postId={id} />
    </Paper>
  );
};
