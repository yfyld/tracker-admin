import { Modal, Form, Input, Select, Checkbox } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IBaseUser, IRoleList } from '@/api';
import { toastformError, trimAll } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doEditUser, doPutUser, doPutUserByAdmin } from '@/store/actions';
import { CheckboxOptionType } from 'antd/lib/checkbox';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  onPutUserByAdmin: (param: IBaseUser) => IAction;
  userInfo: IBaseUser;
  allRoleList: IRoleList;
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
      props.onPutUserByAdmin({
        ...props.userInfo,
        ...values
      });
      props.onClose(false);
    });
  };

  // const options = props.roles.map(item => ({
  //   label: item.name,
  //   value: parseInt(item.id),
  //   disabled: item.disabled,
  //   checked: item.checked,
  //   type: item.type
  // }));

  const roleOptions: CheckboxOptionType[] = props.allRoleList.list.map((item) => ({
    label: item.name,
    value: item.id,
    disabled: !item.status,
    type: item.type
  }));

  return (
    <Modal onOk={handleSubmit} title='编辑用户' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='用户名'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: props.userInfo.username
          })(<Input placeholder='请输入用户名' disabled={true} />)}
        </Form.Item>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称' }],
            initialValue: props.userInfo.nickname
          })(<Input placeholder='请输入用户昵称' />)}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [{ message: '请输入Email' }],
            initialValue: props.userInfo.email
          })(<Input placeholder='请输入用户Email' />)}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('mobile', {
            rules: [{ message: '请输入手机号' }],
            initialValue: props.userInfo.mobile
          })(<Input placeholder='请输入手机号' />)}
        </Form.Item>
        <Form.Item label='角色'>
          {getFieldDecorator('roleIds', {
            rules: [{ required: true, message: '至少选择一个角色' }],
            initialValue: props.userInfo.roles.map((item) => item.id)
          })(<Checkbox.Group options={roleOptions} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { allRoleList } = state.role;
  return {
    allRoleList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onPutUserByAdmin: (params: IBaseUser) => {
        return doPutUserByAdmin.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(UserEditModal));
