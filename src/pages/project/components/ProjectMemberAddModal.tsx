import { Modal, Form, Input, Select, Button, Spin } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';

import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddProjectMember } from '@/store/actions';
import { IProjectMemberAddParam, IRoleList, IUserList, fetchUserList, IProjectInfo } from '@/api';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  projectInfo: IProjectInfo;
  allRoleList: IRoleList;

  onAddProjectMember: (param: IProjectMemberAddParam) => IAction;
}

const ProjectMemberAddModel = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;

  const [userList, setuserList] = React.useState<IUserList>({ list: [], totalCount: 0 });

  const [fetching, setfetching] = React.useState(false);

  React.useEffect(() => {
    props.form.resetFields();
    if (!userList.totalCount) {
      handleSearch('');
    }
  }, [props.visible]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }

      props.onAddProjectMember({ projectId: props.projectInfo.id, ...values });
      props.onClose(false);
    });
  };

  const handleSearch = async (value: string) => {
    setfetching(true);
    const response = await fetchUserList({
      page: 1,
      pageSize: 50,
      nickname: value,
      username: value
    });
    setuserList(response.data);
    setfetching(false);
  };

  return (
    <Modal onOk={handleSubmit} title='添加应用成员' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='添加成员'>
          {getFieldDecorator(
            'userIds',
            {}
          )(
            <Select
              mode='multiple'
              placeholder='选择用户'
              notFoundContent={fetching ? <Spin size='small' /> : null}
              filterOption={false}
              onSearch={handleSearch}
            >
              {userList.list.map((item) => (
                <Option
                  key={item.id}
                  value={'' + item.id}
                  disabled={!!props.projectInfo.members.find((val) => val.id === item.id)}
                >
                  {item.nickname || item.username}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='角色'>
          {getFieldDecorator(
            'roleCode',
            {}
          )(
            <Select placeholder='选择角色'>
              {props.allRoleList.list
                .filter((item) => item.type === 1)
                .map((item) => (
                  <Option key={item.id} value={'' + item.code}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectInfo } = state.project;

  const { allRoleList } = state.role;
  return {
    projectInfo,

    allRoleList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onAddProjectMember: (params: IProjectMemberAddParam) => {
        return doAddProjectMember.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(ProjectMemberAddModel));
