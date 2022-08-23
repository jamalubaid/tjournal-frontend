import { Button } from '@material-ui/core';
import {
  WhatshotOutlined as FireIcon,
  FormatListBulletedOutlined as ListIcon,
  SmsOutlined as MessageIcon,
  TrendingUpOutlined as TrendingIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './LeftMenu.module.scss';

const menu = [
  { text: 'Лента', icon: <FireIcon />, path: '/', disabled: false },
  {
    text: 'Сообщения',
    icon: <MessageIcon />,
    path: '/messages',
    disabled: true,
  },
  {
    text: 'Рейтинг RJ',
    icon: <TrendingIcon />,
    path: '/rating',
    disabled: false,
  },
  { text: 'Подписки', icon: <ListIcon />, path: '/follows', disabled: true },
];

export const LeftMenu: FC = () => {
  const router = useRouter();

  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
            {!obj.disabled ? (
              <Link href={obj.path} draggable>
                <a>
                  <Button
                    variant={router.asPath === obj.path ? 'contained' : 'text'}
                    disabled={obj.disabled}
                  >
                    {obj.icon}
                    {obj.text}
                  </Button>
                </a>
              </Link>
            ) : (
              <Button
                variant={router.asPath === obj.path ? 'contained' : 'text'}
                disabled={obj.disabled}
              >
                {obj.icon}
                {obj.text}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
