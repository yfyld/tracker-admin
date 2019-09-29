import * as React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import AccountLayout from './components/AccountLayout';
import { Link } from 'react-router-dom';

import { IAction } from '@/types';
import style from './Account.less';
import { doLogin } from '@/store/actions';
import { ILoginParam } from '@/api';

interface Props {
  form: WrappedFormUtils;
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

const Login = ({ form, doLoginRequest }: Props) => {
  const { getFieldDecorator } = form;
  return (
    <AccountLayout>
      <h2 className={style.title}>登录</h2>
      <Form onSubmit={e => onSubmit(e, form, doLoginRequest)} className='login-form'>
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
          <Button type='primary' htmlType='submit' className={style.btn}>
            登&emsp;&emsp;录
          </Button>
          <div className={style.text}>
            没有账号 <Link to='/signup'>马上注册!</Link>
          </div>
        </Form.Item>
      </Form>
    </AccountLayout>
  );
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

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(Login));
