import { Modal, Form, Input } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IAddProject } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doSignup } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  handleAddUser: (param: IAddProject) => IAction;
}

const UserAddModel = (props: Props) => {
  const { getFieldDecorator } = props.form;

  React.useEffect(() => {
    props.form.resetFields();
  }, [props.visible]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.handleAddUser(values);
      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='新建用户' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='用户名'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(<Input placeholder='请输入用户名' />)}
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称' }]
          })(<Input placeholder='请输入昵称' />)}
        </Form.Item>
        <Form.Item label='email'>
          {getFieldDecorator('email', {})(<Input placeholder='请输入Email' />)}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('mobile', {})(<Input placeholder='请输入手机号' />)}
        </Form.Item>
        <Form.Item label='密码'>
          {getFieldDecorator('password', {})(<Input placeholder='请输入密码' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleAddUser: params => {
        return doSignup.request(params);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Form.create<Props>()(UserAddModel));
