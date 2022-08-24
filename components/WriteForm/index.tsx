import { Button, Input } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

import styles from './WriteForm.module.scss';

let Editor = dynamic(
  () =>
    import('../Editor').then((m) => {
      return m.Editor;
    }),
  { ssr: false }
);

interface WriteFormProps {
  data?: PostItem;
}

export const WriteForm: FC<WriteFormProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(data?.title || '');
  const [blocks, setBlocks] = useState(data?.body || []);
  const { push } = useRouter();

  const onAddPost = async () => {
    try {
      setIsLoading(true);
      const obj = {
        title,
        body: blocks,
      };
      if (!data) {
        const post = await Api().post.create(obj);
        push(`/write/${post.id}`).catch();
      } else {
        await Api().post.update(obj, data.id);
      }
    } catch (error) {
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="container">
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
        onClick={onAddPost}
        disabled={isLoading || !blocks.length}
        variant="contained"
        color="primary"
        className={styles.button}
      >
        Опубликовать
      </Button>
    </div>
  );
};
