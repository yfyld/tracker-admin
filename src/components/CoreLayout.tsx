import * as React from 'react';
import AppHeader from './AppHeader';
import style from './CoreLayout.module.less';
import AppSidebar from './AppSidebar';
import { connect } from 'react-redux';
import { IStoreState } from '@/types';

interface Props {
  children: any;
  collapsed: boolean;
}

const CoreLayout = ({ children, collapsed }: Props) => {
  return (
    <div className={style.wrapper + ' ' + (collapsed ? style.collapsedWrapper : '')}>
      <div className={style.header}>
        <AppHeader />
      </div>
      <div className={style.sidebar}>
        <AppSidebar />
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { collapsed } = state.app;
  return {
    collapsed
  };
};

export default connect(mapStateToProps)(CoreLayout);
