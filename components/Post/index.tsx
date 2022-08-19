import React from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import { PostActions } from '../PostActions';
import { PostItem } from '../../utils/api/types';

export const Post: React.FC<PostItem> = ({ title, description, imageUrl, id }) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <Link href={`/news/${id}`}>
          <a>{title}</a>
        </Link>
      </Typography>
      <div className={styles.text}>
      <Typography className="mt-10 mb-15" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {imageUrl && (
        <img
          src="https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"
          height={500}
          width={600}
        />
      )}
      <PostActions />
    </Paper>
  );
};
