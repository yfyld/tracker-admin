import { Modal, Form, Input, Select } from 'antd';
import * as React from 'react';
import { formItemLayout, permissionTypeDescription } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IBasePermission, IUpdatePermission } from '@/api';
import { toastformError, trimAll } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doPostPermission, doPutPermission } from '@/store/actions';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  onPutPermission: (param: IUpdatePermission) => IAction;
  updatePermissionItem: IUpdatePermission;
}

const PermissionEditModal = (props: Props) => {
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
      props.onPutPermission({
        ...props.updatePermissionItem,
        ...values,
      });
      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='新建权限' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='权限名'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入权限名' }],
            initialValue: props.updatePermissionItem.name
          })(<Input placeholder='请输入权限名' disabled={true} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="权限描述">
          {getFieldDecorator('description', {
            initialValue: props.updatePermissionItem.description
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入权限描述"
              rows={4}
            />
          )}
        </Form.Item>
        <Form.Item label='权限码'>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入权限码' }],
            initialValue: props.updatePermissionItem.code
          })(<Input placeholder='请输入权限码' disabled={true} />)}
        </Form.Item>
        <Form.Item label='权限类型'>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '权限类型' }],
            initialValue: props.updatePermissionItem.type
          })(
            <Select placeholder="请选择" disabled={true}>
              {
                permissionTypeDescription.map((des, index) => {
                  if (index === 0) return null;
                  return (<Option key={des} value={index}>{des}</Option>)
                })
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { updatePermissionItem } = state.permission;
  return {
    updatePermissionItem
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onPutPermission: (params: IUpdatePermission) => {
        return doPutPermission.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(PermissionEditModal));
