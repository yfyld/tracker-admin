import { Form, Input, Button, Select } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IReportListParam } from '@/api';
import { toastformError } from '@/utils';

const { Search, Group } = Input;
interface Props extends FormComponentProps {
  onSubmit: (param: IReportListParam) => any;
  defaultValue: IReportListParam;
}

const ReportListForm = (props: Props) => {
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
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Search size='large' placeholder='搜索' />)}
      </Form.Item>
      {/* <Form.Item >
        {getFieldDecorator('inBoard', {
          initialValue: props.defaultValue.inBoard
        })(
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>显示</Select.Option>
            <Select.Option value={0}>不显示</Select.Option>
          </Select>
        )}
      </Form.Item> */}
    </Form>
  );
};

export default Form.create<Props>()(ReportListForm);
