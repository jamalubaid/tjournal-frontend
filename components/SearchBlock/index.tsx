import { List, ListItem, Paper, PaperProps } from '@material-ui/core';
import { Close, SearchOutlined as SearchIcon } from '@material-ui/icons';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';

import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

import styles from './SearchBlock.module.scss';

export const SearchBlock: FC<PaperProps> = () => {
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([]);
  const setRef = useRef();

  const handleChangeInput = async (e) => {
    setSearchValue(e.target.value);
    try {
      const { items } = await Api().post.search({ title: e.target.value });
      setPosts(items);
    } catch (err) {
      console.warn('error', err);
    }
  };

  const resetChangeInput = () => {
    setSearchValue('');
    setPosts([]);
  };

  const hideExceptSearchElem = (e) => {
    if (!e.path.includes(setRef.current)) {
      setPosts([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', hideExceptSearchElem);
  }, []);

  return (
    <Paper classes={{ root: styles.root }} elevation={0} ref={setRef}>
      <div className={styles.searchBlock}>
        <SearchIcon className={styles.searchIcon} />
        <input
          value={searchValue}
          onChange={handleChangeInput}
          placeholder="Search"
        />
        {searchValue.length ? (
          <div className={styles.searchClose} onClick={resetChangeInput}>
            <Close />
          </div>
        ) : null}
        {posts?.length > 0 && (
          <Paper className={styles.searchBlockPopup}>
            <List>
              {posts?.map((obj) => (
                <Link key={obj.id} href={`/news/${obj.id}`}>
                  <a>
                    <ListItem button>{obj.title}</ListItem>
                  </a>
                </Link>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </Paper>
  );
};
