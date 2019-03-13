import * as React from 'react';
import style from './App.module.less';
import Routes from '@/router';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { RootState } from '@/types';


interface Props{
  loading:boolean
  loadingText:string
}

const App =({loading,loadingText}:Props)=> {
    return (
      <>
        <Spin spinning={loading} className={style.spin} delay={50} tip={loadingText}></Spin>
        <Routes />
      </>

    );
  
}

const mapStateToProps = (state:RootState) => ({
  loading: state.app.loading,
  loadingText:state.app.loadingText
});

export default connect(mapStateToProps)(App);
