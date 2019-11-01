import { Modal, Form, Input } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IAddProject, IMetadataAddParam } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddProject, doAddMetadata } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  projectId: number;
  onSubmit: (param: IMetadataAddParam) => IAction;
}

const MetadataAddModel = (props: Props) => {
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
      props.onSubmit({ projectId: props.projectId, status: 1, ...values });
      props.onClose(false);
    });
  };
  return (
    <Modal onOk={handleSubmit} title='新增元数据' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='事件code'>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入事件code' }]
          })(<Input placeholder='请输入事件code' />)}
        </Form.Item>
        <Form.Item label='事件名称'>
          {getFieldDecorator('name', { rules: [{ required: true, message: '请输入事件名称' }] })(
            <Input placeholder='请输入事件名称' />
          )}
        </Form.Item>
        <Form.Item label='事件备注'>
          {getFieldDecorator('description', {})(<Input placeholder='请输入事件备注' />)}
        </Form.Item>

        {/* <Form.Item label='自定义属性'>
          {getFieldDecorator('field', {})(<Input placeholder='新增自定义属性' />)}
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(MetadataAddModel);
