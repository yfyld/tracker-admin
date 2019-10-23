import { Form, Input, Button } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IMetadataListParam } from '@/api';
import { toastformError } from '@/utils';
interface Props extends FormComponentProps {
  onSubmit: (param: IMetadataListParam) => any;
  defaultValue: IMetadataListParam;
}

const MetadataListForm = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ ...props.defaultValue, ...values });
    });
  };
  return (
    <Form onSubmit={handleSubmit} layout='inline'>
      <Form.Item label=''>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Input placeholder='名称' />)}
      </Form.Item>
      <Form.Item label=''>
        {getFieldDecorator('code', {
          initialValue: props.defaultValue.code
        })(<Input placeholder='Code' />)}
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>查询</Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>()(MetadataListForm);
