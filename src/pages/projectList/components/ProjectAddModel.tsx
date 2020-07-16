import { Modal, Form, Input } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IAddProject } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddProject } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  handleAddProject: (param: IAddProject) => IAction;
}

const ProjectAddModel = (props: Props) => {
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
      props.handleAddProject(values);
      props.onClose(false);
    });
  };
  return (
    <Modal onOk={handleSubmit} title='新建应用' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='应用名称'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入应用名称' }]
          })(<Input placeholder='请输入应用名称' />)}
        </Form.Item>
        <Form.Item label='应用描述'>
          {getFieldDecorator('description', {})(<Input placeholder='请输入应用描述' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleAddProject: (params) => {
        return doAddProject.request(params);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Form.create<Props>()(ProjectAddModel));
