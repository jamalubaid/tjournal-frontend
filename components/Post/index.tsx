import { Paper, Typography } from '@material-ui/core';
import Link from 'next/link';
import { FC } from 'react';

import { PostItem } from '../../utils/api/types';
import { PostActions } from '../PostActions';

import styles from './Post.module.scss';

export const Post: FC<PostItem> = ({ title, imageUrl, id, body }) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <Link href={`/news/${id}`}>
          <a>{title}</a>
        </Link>
      </Typography>
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
