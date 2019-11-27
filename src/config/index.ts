import { getBaseURL } from './../utils/util';
import defaultConfig from './config';

const config = {
  ...defaultConfig
};

if (!config.baseURL) {
  config.baseURL = getBaseURL();
}

export default config;
