import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';
import { useRouter } from 'next/router';

let Editor = dynamic(
  () =>
    import('../Editor').then((m) => {
      return m.Editor;
    }),
  { ssr: false },
);

interface WriteFormProps {
  data: PostItem;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const [isLoading, setIsloading] = useState(false);
  const [title, setTitle] = useState(data?.title || '');
  const [blocks, setBlocks] = useState(data?.body || []);
  const router = useRouter();

  const onAddPost = async () => {
    try {
      setIsloading(true);
      const obj = {
        title,
        body: blocks,
      };
      if (!data) {
        const post = await Api().post.create(obj);
        router.push(`/write/${post.id}`);
      } else {
        await Api().post.update(obj, data.id);
      }
    } catch (error) {
    } finally {
      setIsloading(true);
    }
  };

  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor initialBlock={blocks} onChange={(arr) => setBlocks(arr)} />
      </div>
      <Button
        style={{ zIndex: 10 }}
        onClick={onAddPost}
        disabled={isLoading || !blocks.length}
        variant="contained"
        color="primary"
      >
        Опубликовать
      </Button>
    </div>
  );
};
