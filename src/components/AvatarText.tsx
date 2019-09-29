import * as React from 'react'
import style from './AvatarText.module.less'

const AvatarText = ({ name = '' }) => {
  return <div className={style.wrapper}>{(/^\w*$/.test(name) ? name.substr(0, 4) : name.substr(-2)) || '无名'}</div>
}
export default AvatarText
