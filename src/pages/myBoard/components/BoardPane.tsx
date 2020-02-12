import noimg from '@/assets/imgs/noimg.jpg';
import AvatarText from '@/components/AvatarText';
import { Card, Icon, Popover, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import style from './BoardPane.module.less';
import { IMyBoardListItem } from '@/api';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doDeleteProject } from '@/store/actions';
const { Meta } = Card;
const { confirm } = Modal;

interface Props {
  boardInfo: IMyBoardListItem;
  doDeleteProject: (id: number) => IAction;
}

const ProjectPane = ({ boardInfo, doDeleteProject }: Props) => {
  const handleDelete = () => {
    confirm({
      title: '警告',
      content: '您确定要删除该面板吗?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        doDeleteProject(boardInfo.id);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  return (
    <Link className={style.wrapper} to={`/project/board?projectId=${boardInfo.projectId}&boardId=${boardInfo.id}`}>
      <Card
        style={{ width: 300 }}
        cover={<img alt='image' src={noimg} />}
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
          avatar={<AvatarText info={boardInfo.creator} />}
          title={boardInfo.name}
          description={boardInfo.description || '这人太懒了,没写描述'}
        />
      </Card>
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
