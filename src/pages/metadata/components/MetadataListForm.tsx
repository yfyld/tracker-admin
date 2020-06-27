import { Form, Input, Button, Select } from 'antd';
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
      props.onSubmit({ ...props.defaultValue, code: '', name: '', [values.type]: values.name });
    });
  };

  const prefixSelector = getFieldDecorator('type', {
    initialValue: 'name'
  })(
    <Select size='large'>
      <Select.Option value='name'>名称</Select.Option>
      <Select.Option value='code'>Code</Select.Option>
    </Select>
  );

  return (
    <Form onSubmit={handleSubmit} layout='inline'>
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Input.Search size='large' addonBefore={prefixSelector} placeholder='搜索' />)}
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>()(MetadataListForm);
