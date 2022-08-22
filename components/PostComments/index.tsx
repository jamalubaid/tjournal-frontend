import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { FC, useState } from "react";



import { useComments } from '../../hooks/useComment';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { CommentItem } from '../../utils/api/types';
import { AddCommentForm } from '../AddCommentsForm';
import { Comment } from '../Comment';


export interface IPostCommentsProps {
  postId?: number;
}

export const PostComments: FC<IPostCommentsProps> = ({ postId }) => {
  const userData = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = useState(0);
  const { comments, setComments } = useComments(postId);

  const onAddComment = (obj: CommentItem) => {
    setComments((prev) => [...prev, obj]);
  };

  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          {comments.length} комментарий
        </Typography>
        <Tabs
          onChange={(_, newValur) => setActiveTab(newValur)}
          className="mt-20"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        {userData && <AddCommentForm onSuccesAdd={onAddComment} postId={postId} />}
        <div className="mb-20" />
        {comments.map((obj) => (
          <Comment
            key={obj.id}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createAt={obj.createdAt}
            currentUserId={userData?.id}
            onRemove={onRemoveComment}
          />
        ))}
      </div>
    </Paper>
  );
};