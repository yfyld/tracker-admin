import { Modal, Form, Input, Select } from 'antd';
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
  handleAddMetadata: (param: IMetadataAddParam) => IAction;
}

const TagEditModal = (props: Props) => {
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
      props.handleAddMetadata({ projectId: props.projectId, status: 1, ...values });
      props.onClose(false);
    });
  };
  return (
    <Modal onOk={handleSubmit} title='新增元数据' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='自定义标签'>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入事件code' }]
          })(
            <Select mode='tags' style={{ width: '100%' }} placeholder='Tags Mode'>
              {}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  return {
    projectId
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleAddMetadata: (params: IMetadataAddParam) => {
        return doAddMetadata.request(params);
      }
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create<Props>()(TagEditModal));
