import { IconButton } from '@material-ui/core';
import {
  ModeCommentOutlined as CommentsIcon,
  BookmarkBorderOutlined as FavoriteIcon,
  RepeatOutlined as RepostIcon,
  ShareOutlined as ShareIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import { CSSProperties, FC } from 'react';

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  top: '5',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};

interface IPostActionsProps {
  postId?: number;
}

export const PostActions: FC<IPostActionsProps> = ({ postId }) => {
  return (
    <ul style={styles}>
      <Link href={`/news/${postId}`}>
        <a>
          <IconButton>
            <CommentsIcon />
          </IconButton>
        </a>
      </Link>
      <li>
        <IconButton disabled>
          <RepostIcon />
        </IconButton>
      </li>
      <li>
        <IconButton disabled>
          <FavoriteIcon />
        </IconButton>
      </li>
      <li>
        <IconButton disabled>
          <ShareIcon />
        </IconButton>
      </li>
    </ul>
  );
};
