import { getBaseURL } from './../utils/util';
import defaultConfig from './config';

const config = {
  ...defaultConfig
};

if (!config.baseURL) {
  config.baseURL = getBaseURL();
}

if (config.singelLoginURL === 'auto') {
  config.singelLoginURL = `http://employee.qa.91jkys.com/sso/login?redirect=${config.baseURL}/user/single-signon`;
}

export default config;
