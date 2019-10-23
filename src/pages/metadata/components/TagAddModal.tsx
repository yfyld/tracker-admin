import { Form, Input, Modal } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { ITagAddParam } from '@/api';
import { toastformError } from '@/utils';
import { formItemLayout } from '@/constants';
const { TextArea } = Input;
interface Props extends FormComponentProps {
  visible: boolean;
  onSubmit: (param: ITagAddParam) => any;
  onClose: (param: boolean) => any;
}

const TagAddModal = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit(values);
      props.onClose(false);
    });
  };
  return (
    <Modal title='新增标签' visible={props.visible} onOk={handleSubmit} onCancel={() => props.onClose(false)}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label='名称'>
          {getFieldDecorator('name', {
            initialValue: ''
          })(<Input placeholder='名称' />)}
        </Form.Item>
        <Form.Item label='描述'>
          {getFieldDecorator('description', {
            initialValue: ''
          })(<TextArea placeholder='description' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(TagAddModal);
