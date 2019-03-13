import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "antd/dist/antd.css"
import "@/styles/style.less"


import configureStore from '@/store/configureStore';



const isIframe = window.top !== window.self;
if (isIframe) {
  document.domain = 'yfyld.online';
  const div = document.createElement('div');
  window.parent.document.body.appendChild(div);
  message.config({
    getContainer: () => div
  })
}

export const store =configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <App />
      </LocaleProvider>
    </Provider>
      
  </Router>,
  document.getElementById('app') as HTMLElement
);

registerServiceWorker();