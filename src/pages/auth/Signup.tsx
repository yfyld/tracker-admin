import * as React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import * as actions from '@/store/actions';
import AccountLayout from './components/AccountLayout';
import { Link } from 'react-router-dom';
import style from './Account.less';
import { IAction } from '@/types';
import { ISignupParam } from '@/api';
interface Props {
  form: WrappedFormUtils;
  doSignupRequest: (params: ISignupParam) => {};
}

const onSubmit = (e: React.FormEvent, form: WrappedFormUtils, doLoginRequest: (params: ISignupParam) => {}) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (err) {
      message.error('请填写正确的账号信息');
      return;
    }
    doLoginRequest(values);
  });
};

const Signup = ({ form, doSignupRequest }: Props) => {
  const { getFieldDecorator } = form;
  return (
    <AccountLayout>
      <h2 className={style.title}>注册</h2>
      <Form onSubmit={(e) => onSubmit(e, form, doSignupRequest)} className='login-form'>
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入姓名' }]
          })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入姓名' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号' }]
          })(<Input prefix={<Icon type='mobile' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入手机号' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
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
            注&emsp;&emsp;册
          </Button>
          <div className={style.text}>
            已有账号 <Link to='/login'>去登录</Link>
          </div>
        </Form.Item>
      </Form>
    </AccountLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doSignupRequest: (params: ISignupParam) => {
        return actions.doSignup.request(params);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Form.create()(Signup));
