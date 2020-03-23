import { Modal, Form, Input, Select } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IBaseUser } from '@/api';
import { toastformError, trimAll } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doEditUser, doPutUser } from '@/store/actions';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  onPutUser: (param: IBaseUser) => IAction;
  updateUserItem: IBaseUser;
}

const UserEditModal = (props: Props) => {
  const { getFieldDecorator } = props.form;

  React.useEffect(() => {
    props.form.resetFields();
  }, [props.visible]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      values.username = trimAll(values.username);
      values.nickname = trimAll(values.nickname);
      props.onPutUser({
        ...props.updateUserItem,
        ...values,
      });
      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='编辑用户' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='用户名'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: props.updateUserItem.username
          })(<Input placeholder='请输入用户名' disabled={true} />)}
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称' }],
            initialValue: props.updateUserItem.nickname
          })(<Input placeholder='请输入用户昵称' />)}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入Email' }],
            initialValue: props.updateUserItem.email
          })(<Input placeholder='请输入用户Email' />)}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号' }],
            initialValue: props.updateUserItem.mobile
          })(<Input placeholder='请输入手机号' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { updateUserItem } = state.app;
  return {
    updateUserItem
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onPutUser: (params: IBaseUser) => {
        return doPutUser.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(UserEditModal));
