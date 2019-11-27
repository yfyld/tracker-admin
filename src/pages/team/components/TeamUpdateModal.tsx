import { Modal, Form, Input, Select, Radio, Spin } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IUserListParam, IUserList, ITeamAddParam, ITeamInfo, ITeamUpdateParam } from '@/api';
import { toastformError } from '@/utils';

import { IAction } from '@/types';

import debounce from 'lodash/debounce';

const { Option } = Select;
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => void;
  userList: IUserList;
  orginInfo: ITeamInfo;
  onSearchUser: (param: IUserListParam) => IAction;
  onSubmit: (param: ITeamUpdateParam) => IAction;
}

const TeamUpdateModel = (props: Props) => {
  const { getFieldDecorator, resetFields, validateFields } = props.form;
  React.useEffect(() => {
    resetFields();
    //第一次
    if (props.visible && !props.userList.list.length) {
      props.onSearchUser({ page: 1, pageSize: 50 });
    }
  }, [props.visible]);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ id: props.orginInfo.id, ...values });
      props.onClose(false);
    });
  };

  const handleSearch = debounce((value: string) => {
    props.onSearchUser({ nickname: value, page: 1, pageSize: 50 });
  }, 800);

  return (
    <Modal onOk={handleSubmit} title='编辑团队' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='团队Owner'>
          {getFieldDecorator('creatorId', {
            initialValue: props.orginInfo.creator.id
          })(
            <Select
              showSearch
              onSearch={handleSearch}
              filterOption={false}
              notFoundContent={null}
              placeholder='请选择团队owner'
            >
              {props.userList.list.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.nickname || item.username}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='团队名称'>
          {getFieldDecorator('name', {
            initialValue: props.orginInfo.name,
            rules: [{ required: true, message: '请输入团队名称' }]
          })(<Input placeholder='请输入团队名称' />)}
        </Form.Item>

        <Form.Item label='公开'>
          {getFieldDecorator('public', {
            initialValue: props.orginInfo.public
          })(
            <Radio.Group>
              <Radio value={true}>公开</Radio>
              <Radio value={false}>私有</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='团队描述'>
          {getFieldDecorator('description', { initialValue: props.orginInfo.description })(
            <Input placeholder='请输入团队描述' />
          )}
        </Form.Item>
        <Form.Item label='成员'>
          {getFieldDecorator('members', { initialValue: props.orginInfo.members.map(item => item.id) })(
            <Select
              mode='multiple'
              onSearch={handleSearch}
              filterOption={false}
              notFoundContent={null}
              placeholder='请选择成员'
            >
              {props.userList.list.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.nickname || item.username}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(TeamUpdateModel);