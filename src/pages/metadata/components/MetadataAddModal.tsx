import { Modal, Form, Input, Select, Button } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IMetadataAddParam, ITagList, IMetadataType } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddMetadata } from '@/store/actions';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  projectId: number;
  tagList: ITagList;
  handleAddMetadata: (param: IMetadataAddParam) => IAction;
}

const MetadataAddModel = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const { TextArea } = Input;
  const [newTags, setNewTags] = React.useState(['']);
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
      if (values.newTags) {
        const newTagsTemp: string[] = [];
        if (!values.tags) {
          values.tags = [];
        }
        values.newTags.forEach((item: string) => {
          if (/^\+?[1-9][0-9]*$/g.test(item)) {
            values.tags.push(parseInt(item));
          } else {
            newTagsTemp.push(item);
          }
        });
        values.newTags = newTagsTemp;
      }
      props.handleAddMetadata({ projectId: props.projectId, status: 0, ...values });
      props.onClose(false);
    });
  };

  const handleTagChange = (selectedItems: string[]) => {
    console.log('selectedItems', selectedItems);
  };

  const handleAddTag = () => {
    console.log('newTags', newTags);
    newTags.push('');
    setNewTags(newTags);
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
        <Form.Item label='事件类型'>
          {getFieldDecorator('type', { rules: [{ required: true, message: '请选择事件类型' }] })(
            <Select placeholder='请选择事件类型'>
              <Option value={IMetadataType.page}>页面</Option>
              <Option value={IMetadataType.event}>事件</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='标签'>
          {getFieldDecorator('newTags', {})(
            <Select mode='tags' placeholder='选择或添加事件标签'>
              {props.tagList.list.map(item => (
                <Option key={item.id} value={'' + item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='事件备注'>
          {getFieldDecorator('description', {})(<TextArea placeholder='请输入事件备注' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  const tagList = state.metadata.tagList;
  return {
    projectId,
    tagList
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
)(Form.create<Props>()(MetadataAddModel));
