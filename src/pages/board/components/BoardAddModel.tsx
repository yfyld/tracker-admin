import { Modal, Form, Card, Input, Radio, Select } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IBoardAddParam } from '@/api';
import { toastformError } from '@/utils';
import { IAction } from '@/types';
import { formItemLayout } from '@/constants';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => void;
  projectId: number;
  onSubmit: (param: IBoardAddParam) => IAction;
}

const BoardAddModel = (props: Props) => {
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
      props.onSubmit({ projectId: props.projectId, ...values, layout: [] });
      props.onClose(false);
    });
  };

  return (
    <Modal onOk={handleSubmit} title='新增看板' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='看板名称'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入看板名称' }]
          })(<Input placeholder='请输入看板名称' />)}
        </Form.Item>

        {/* <Form.Item label='公开'>
          {getFieldDecorator('public', {
            initialValue: true
          })(
            <Radio.Group>
              <Radio value={true}>公开</Radio>
              <Radio value={false}>私有</Radio>
            </Radio.Group>
          )}
        </Form.Item> */}
        <Form.Item label='看板描述'>
          {getFieldDecorator('description', {})(<Input placeholder='请输入看板描述' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(BoardAddModel);
