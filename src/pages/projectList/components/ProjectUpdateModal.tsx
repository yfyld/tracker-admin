import { Modal, Form, Input, message } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IProjectUpdateParam, IProjectListItem } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doUpdateProject } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  orginInfo: IProjectListItem;
  onSubmit: (param: IProjectUpdateParam) => IAction;
}

const ProjectUpdateModel = (props: Props) => {
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
      props.onSubmit({ id: props.orginInfo.id, ...values });
      props.onClose(false);
    });
  };
  return (
    <Modal onOk={handleSubmit} title='编辑项目' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='项目名称'>
          {getFieldDecorator('name', {
            initialValue: props.orginInfo.name,
            rules: [{ required: true, message: '请输入项目名称' }]
          })(<Input placeholder='请输入项目名称' />)}
        </Form.Item>
        <Form.Item label='项目描述'>
          {getFieldDecorator('description', { initialValue: props.orginInfo.description })(
            <Input placeholder='请输入项目描述' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(ProjectUpdateModel);
