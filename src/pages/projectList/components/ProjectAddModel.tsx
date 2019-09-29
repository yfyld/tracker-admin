import { Modal, Form, Input } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IAddProject } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { Action } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddProject } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  handleAddProject: (param: IAddProject) => Action;
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
    <Modal onOk={handleSubmit} title='新建项目' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='项目名称'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入项目名称' }]
          })(<Input placeholder='请输入项目名称' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      handleAddProject: params => {
        return doAddProject.request(params);
      }
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Form.create<Props>()(ProjectAddModel));
