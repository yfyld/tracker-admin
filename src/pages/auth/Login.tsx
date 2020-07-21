import * as React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import AccountLayout from './components/AccountLayout';
import { Link } from 'react-router-dom';

import { IAction, IStoreState } from '@/types';
import style from './Account.less';
import { doLogin } from '@/store/actions';
import { ILoginParam } from '@/api';
import config from '@/config';

interface Props {
  form: WrappedFormUtils;
  location: Location;
  doLoginRequest: (params: ILoginParam) => {};
}

const onSubmit = (e: React.FormEvent, form: WrappedFormUtils, doLoginRequest: (params: ILoginParam) => {}) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (err) {
      message.error('请填写正确的账号信息');
      return;
    }
    doLoginRequest(values);
  });
};

const Login = ({ form, doLoginRequest, location }: Props) => {
  const { getFieldDecorator } = form;

  React.useEffect(() => {
    if (config.singelLoginURL && !/test/.test(location.search)) {
      window.location.replace(config.singelLoginURL);
    }
  }, [config.signupAble]);
  return config.singelLoginURL ? (
    <div>正在跳转</div>
  ) : (
    <AccountLayout>
      <h2 className={style.title}>登录</h2>
      <Form onSubmit={(e) => onSubmit(e, form, doLoginRequest)} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入手机号' }]
          })(<Input prefix={<Icon type='mobile' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入手机号' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='请输入密码'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit' className={style.btn}>
            登&emsp;&emsp;录
          </Button>

          <a href={config.singelLoginURL}>
            <Button block type='primary' className={style.btn}>
              内&emsp;网&emsp;登&emsp;录
            </Button>
          </a>

          {config.signupAble && (
            <div className={style.text}>
              没有账号 <Link to='/signup'>马上注册!</Link>(测试用,请直接内网登录)
            </div>
          )}
        </Form.Item>
      </Form>
    </AccountLayout>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { location } = state.router;
  return {
    location
  };
};
const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doLoginRequest: (params: ILoginParam) => {
        return doLogin.request(params);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Form.create()(Login));
