import { Form, Input, Button, Select } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IReportListParam } from '@/api';
import { toastformError } from '@/utils';
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
      <Form.Item label='报表名称'>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Input placeholder='报表名称' />)}
      </Form.Item>
      <Form.Item label='看板报表'>
        {getFieldDecorator('inBoard', {
          initialValue: props.defaultValue.inBoard
        })(
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>显示</Select.Option>
            <Select.Option value={0}>不显示</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>查询</Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>()(ReportListForm);
