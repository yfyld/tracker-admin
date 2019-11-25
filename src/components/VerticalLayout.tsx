import * as React from 'react';
import AppHeader from './AppHeader';
import style from './VerticalLayout.module.less';

interface Props {
  children: any;
}

const VerticalLayout = ({ children }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <AppHeader alone />
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default VerticalLayout;
