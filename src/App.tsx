import * as React from 'react';
import style from './App.module.less';
import Routes from '@/router';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { IStoreState } from '@/types';
import { IUserInfo } from './api';

interface Props {
  loading: boolean;
  loadingText: string;
  userInfo: IUserInfo;
}

function addWaterMarker(str: string, dom: HTMLElement) {
  var can = document.createElement('canvas');
  var body = document.body;
  body.appendChild(can);
  can.width = 200;
  can.height = 100;
  can.style.display = 'none';
  var cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = '16px Microsoft JhengHei';
  cans.fillStyle = 'rgba(17, 17, 17, 0.05)';
  cans.textAlign = 'center';
  cans.textBaseline = 'middle';
  cans.fillText(str, can.width / 3, can.height / 2);
  cans.fillText('telescope', can.width / 6, can.height / 1.05);
  dom.style.background = 'url(' + can.toDataURL('image/png') + ') 0 0 repeat';
}

const App = ({ loading, loadingText, userInfo }: Props) => {
  const materMarker = React.useRef(null);
  React.useEffect(() => {
    if (userInfo.id && materMarker.current) {
      addWaterMarker(
        userInfo.nickname + '    ' + (userInfo.mobile || userInfo.username).substr(-4, 4),
        materMarker.current
      );
    }
  }, [userInfo.id]);
  return (
    <>
      <div
        ref={materMarker}
        style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: 999, pointerEvents: 'none' }}
      ></div>
      <Spin spinning={loading} className={style.spin} delay={50} tip={loadingText}></Spin>
      <Routes />
    </>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  loading: state.app.loading,
  loadingText: state.app.loadingText,
  userInfo: state.app.userInfo
});

export default connect(mapStateToProps)(App);
