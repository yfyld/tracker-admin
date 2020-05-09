import { getBaseURL } from './../utils/util';
import defaultConfig from './config';

const config = {
  ...defaultConfig
};

if (!config.baseURL) {
  config.baseURL = getBaseURL();
}

if (!config.singelLoginURL) {
  if (config.baseURL.indexOf('qa') > -1) {
    config.singelLoginURL = `http://employee.qa.91jkys.com/sso/login?redirect=${config.baseURL}/auth/single-signon`;
  } else {
    config.singelLoginURL = `http://employee.91jkys.com/sso/login?redirect=${config.baseURL}/auth/single-signon`;
  }
}

export default config;
