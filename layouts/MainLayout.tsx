import clsx from 'clsx';
import { FC } from 'react';

import { LeftMenu } from '../components/LeftMenu';
import BottomNavigation from '../components/Mobile/BottomNavigation';
import { SideComments } from '../components/SideComments';
import { useAppSelector } from '../redux/hooks';
import { selectMenuVisible } from '../redux/slices/user';

interface MainLayoutProps {
  hideComments?: boolean;
  hideMenu?: boolean;
  contentFullWidth?: boolean;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  contentFullWidth,
  hideComments,
  hideMenu,
  className,
}) => {
  const menuVisible = useAppSelector(selectMenuVisible);
  return (
    <>
      <div className={clsx('wrapper', className)}>
        {!hideMenu && (
          <div className="leftSide">{!menuVisible && <LeftMenu />}</div>
        )}
        <div className={clsx('content', { 'content--full': contentFullWidth })}>
          {children}
        </div>
        {!hideComments && (
          <div className="rightSide">
            <SideComments />
          </div>
        )}
      </div>
    </>
  );
};
