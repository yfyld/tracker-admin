import { Form, Button, Input, Select } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { formItemLayout, tailFormItemLayout } from '@/constants';
import { connect } from 'react-redux';
import { IAction, IStoreState, IPageData } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doUpdateProject } from '@/store/actions';
import { IProjectUpdateParam, IProjectInfo, IProjectListItem } from '@/api';
import { toastformError } from '@/utils';

interface Props extends FormComponentProps {
  handleUpdateProject: (params: IProjectUpdateParam) => IAction;
  projectInfo: IProjectInfo;
  projectList: IPageData<IProjectListItem>;
}

const ProjectInfo = ({ form, projectInfo, handleUpdateProject, projectList }: Props) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      handleUpdateProject({ id: projectInfo.id, ...values });
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 500 }} {...formItemLayout}>
      <Form.Item label='项目名称'>
        {getFieldDecorator('name', {
          initialValue: projectInfo.name,
          rules: [
            {
              required: true,
              message: '项目名称不能为空'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label='trackKey'>{btoa(`{"projectId":${projectInfo.id}}`)}</Form.Item>

      <Form.Item label='关联项目'>
        {getFieldDecorator('associationProjectIds', {
          initialValue: projectInfo.associationProjects.map((item) => item.id)
        })(
          <Select mode='multiple'>
            {projectList.list
              .filter((item) => item.id !== projectInfo.id)
              .map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectInfo, projectList } = state.project;
  return {
    projectInfo,
    projectList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleUpdateProject: (params) => {
        return doUpdateProject.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(Form.create()(ProjectInfo)));
