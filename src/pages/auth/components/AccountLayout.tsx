import * as React from 'react';
import style from './AccountLayout.module.less';
import logo from '@/assets/imgs/logo-b.png';
interface Props {
  children: any;
}
export default class LoginLayout extends React.Component<Props> {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.box}>
            <div className={style.form}>{this.props.children}</div>
          </div>
        </div>
        <div className={style.footer} />
      </div>
    );
  }
}
