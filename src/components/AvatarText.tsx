import * as React from 'react';
import style from './AvatarText.module.less';
import { Popover } from 'antd';

interface Props {
  size?: string;
  color?: string;
  info: {
    nickname: string;
    username: string;
  };
}

const AvatarText = ({ info, size = '', color = null }: Props) => {
  const name = info.nickname || info.username || '无名';
  const content = (
    <div>
      <p>{info.nickname || '匿名'}</p>
      <p>{info.username}</p>
    </div>
  );
  return (
    <Popover placement='bottom' content={content}>
      <div style={{ background: color }} className={style.wrapper + ' ' + style[size]}>
        {/^\w*$/.test(name) ? name.substr(0, 4) : name.substr(-2)}
      </div>
    </Popover>
  );
};
export default AvatarText;
