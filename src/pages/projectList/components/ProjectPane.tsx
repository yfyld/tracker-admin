import noimg from '@/assets/imgs/noimg.jpg';
import AvatarText from '@/components/AvatarText';
import { Card, Icon, Popover, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import style from './ProjectPane.module.less';
import { IProjectListItem } from '@/api';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doDeleteProject } from '@/store/actions';
const { Meta } = Card;
const { confirm } = Modal;

interface Props {
  projectInfo: IProjectListItem;
  doDeleteProject: (id: number) => IAction;
}

const ProjectPane = ({ projectInfo, doDeleteProject }: Props) => {
  const handleDelete = () => {
    let name = '';
    confirm({
      title: '警告',
      content: (
        <div>
          <p>您确定要删除该项目吗?</p>
          <p>
            请输入项目名称<Input defaultValue={name} onChange={e => (name = e.target.value)}></Input>
          </p>
        </div>
      ),
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if (name === projectInfo.name) {
          doDeleteProject(projectInfo.id);
        } else {
          message.error('项目名称不正确,请确认');
          return Promise.reject();
        }
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  return (
    <Link className={style.wrapper} to={`/project/analyse-event?projectId=${projectInfo.id}`}>
      <div>
        <Card
          style={{ width: 300 }}
          cover={<img alt='image' src={projectInfo.image || noimg} />}
          actions={[
            <Icon key='eye' type='eye' />,
            <Icon key='share-alt' type='share-alt' />,
            <Icon
              type='delete'
              key='delete'
              onClick={e => {
                e.preventDefault();
                handleDelete();
              }}
            />
          ]}
        >
          <Meta
            avatar={<AvatarText name={projectInfo.creator.nickname} />}
            title={projectInfo.name}
            description={projectInfo.description || '这人太懒了,没写描述'}
          />
        </Card>
      </div>
    </Link>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doDeleteProject: (id: number) => {
        return doDeleteProject.request(id);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ProjectPane);
