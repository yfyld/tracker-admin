import { Modal, Form, Input, Select } from 'antd';
import * as React from 'react';
import { formItemLayout, roleTypeDescription } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IBaseRole, IUpdateRole } from '@/api';
import { toastformError, trimAll } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doPostRole } from '@/store/actions';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  onAddRole: (param: IBaseRole) => IAction;
  addRoleItem: IBaseRole;
  updateRoleItem: IUpdateRole;
}

const RoleAddModal = (props: Props) => {
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
      // 格式化处理
      values.name = trimAll(values.name);
      values.code = trimAll(values.code.toLocaleUpperCase());
      props.onAddRole(values);
      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='新建角色' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='角色名'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入角色名' }],
            initialValue: props.addRoleItem.name
          })(<Input placeholder='请输入角色名' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="角色描述">
          {getFieldDecorator('description', {
            initialValue: props.addRoleItem.description
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入角色描述"
              rows={4}
            />
          )}
        </Form.Item>
        <Form.Item label='角色码'>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入角色码' }],
            initialValue: props.addRoleItem.code
          })(<Input placeholder='请输入角色码' />)}
        </Form.Item>
        <Form.Item label='角色类型'>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '角色类型' }],
            initialValue: props.addRoleItem.type
          })(
            <Select placeholder="请选择">
              {
                roleTypeDescription.map((des, index) => {
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
  const { addRoleItem, updateRoleItem } = state.role;
  return {
    addRoleItem,
    updateRoleItem
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onAddRole: (params: IBaseRole) => {
        return doPostRole.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(RoleAddModal));
