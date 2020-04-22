import { getBaseURL } from './../utils/util';
import defaultConfig from './config';

const config = {
  ...defaultConfig
};

if (!config.baseURL) {
  config.baseURL = getBaseURL();
}

if (config.singelLoginURL === '') {
  config.singelLoginURL = `${window.location.protocol}//employee.qa.91jkys.com/sso/login?redirect=${config.baseURL}/auth/single-signon`;
}

export default config;
