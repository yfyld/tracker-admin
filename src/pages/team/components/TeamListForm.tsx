import { Form, Input, Button, Select } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { ITeamListParam } from '@/api';
import { toastformError } from '@/utils';

const { Option } = Select;
interface Props extends FormComponentProps {
  onSubmit: (param: ITeamListParam) => any;
  defaultValue: ITeamListParam;
}

const TeamListForm = (props: Props) => {
  const { getFieldDecorator, setFields } = props.form;

  const handleRelevanceChange = () => {
    setFields({ name: '' });
    setTimeout(() => {
      handleSubmit();
    }, 0);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ ...values, page: 1, pageSize: 20 });
    });
  };
  return (
    <Form onSubmit={handleSubmit} layout='inline'>
      <Form.Item>
        {getFieldDecorator('relevance', {
          initialValue: +props.defaultValue.relevance
        })(
          <Select onChange={handleRelevanceChange} style={{ width: 100 }}>
            <Option value={1}>我的团队</Option>
            <Option value={0}>所有团队</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: props.defaultValue.name
        })(<Input placeholder='根据团队名称查询' />)}
      </Form.Item>
      {/* <Form.Item>
        <Button type='primary' htmlType='submit'>
          查询
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default Form.create<Props>()(TeamListForm);
