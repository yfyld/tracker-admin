import { Form, Input, Modal } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { ITagUpdateParam, ITagInfo } from '@/api';
import { toastformError } from '@/utils';
import { formItemLayout } from '@/constants';
const { TextArea } = Input;
interface Props extends FormComponentProps {
  visible: boolean;
  onSubmit: (param: ITagUpdateParam) => any;
  onClose: (param: boolean) => any;
  defaultValue: ITagInfo;
}

const TagEditModal = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ ...props.defaultValue, ...values });
      props.onClose(false);
    });
  };
  return (
    <Modal title='编辑标签' visible={props.visible} onOk={handleSubmit} onCancel={() => props.onClose(false)}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label='名称'>
          {getFieldDecorator('name', {
            initialValue: props.defaultValue.name
          })(<Input placeholder='名称' />)}
        </Form.Item>
        <Form.Item label='描述'>
          {getFieldDecorator('description', {
            initialValue: props.defaultValue.description
          })(<TextArea placeholder='description' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(TagEditModal);
