import { Form, Input, Button } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IMyBoardListParam } from '@/api';
import { toastformError } from '@/utils';
interface Props extends FormComponentProps {
  onSubmit: (param: IMyBoardListParam) => any;
  defaultValue: IMyBoardListParam;
}

const MyBoardForm = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ ...props.defaultValue, ...values, page: 1, pageSize: 20 });
    });
  };
  return (
    <Form onSubmit={handleSubmit} layout='inline' {...formItemLayout}>
      <Form.Item label='看板名称'>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Input placeholder='请输入应用名称' />)}
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          查询
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>()(MyBoardForm);
