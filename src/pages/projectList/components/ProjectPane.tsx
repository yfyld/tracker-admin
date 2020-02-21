import noimg from '@/assets/imgs/noimg.jpg';
import AvatarText from '@/components/AvatarText';
import { Card, Icon, Popover, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import style from './ProjectPane.module.less';
import { IProjectListItem, IProjectUpdateParam } from '@/api';
import { connect } from 'react-redux';
import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doDeleteProject, doUpdateProject } from '@/store/actions';
import ProjectUpdateModal from './ProjectUpdateModal';
import { ROUTE_PATH } from '@/constants';
const { Meta } = Card;
const { confirm } = Modal;

interface Props {
  projectInfo: IProjectListItem;
  onDeleteProject: (id: number) => IAction;
  onUpdateProject: (param: IProjectUpdateParam) => IAction;
}

const ProjectPane = ({ projectInfo, onDeleteProject, onUpdateProject }: Props) => {
  console.log(projectInfo);
  const [updateProjectVisible, setUpdateProjectVisible] = React.useState(false);
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
      cancelText: '取消',
      onOk() {
        if (name === projectInfo.name) {
          onDeleteProject(projectInfo.id);
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
  // const onUpdateProject = (param: IProjectUpdateParam) => {
  //   return ;
  // };
  return (
    <div className={style.wrapper}>
      <ProjectUpdateModal
        orginInfo={projectInfo}
        visible={updateProjectVisible}
        onClose={setUpdateProjectVisible}
        onSubmit={onUpdateProject}
      ></ProjectUpdateModal>
      <Link to={`${ROUTE_PATH.analyseEvent}?projectId=${projectInfo.id}`}>
        <Card
          style={{ width: 300 }}
          cover={<img alt='image' src={projectInfo.image || noimg} />}
          actions={[
            <Icon key='eye' type='eye' />,
            <Icon key='share-alt' type='share-alt' />,
            <Icon
              key='edit'
              type='edit'
              onClick={e => {
                e.preventDefault();
                setUpdateProjectVisible(true);
              }}
            />,
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
            avatar={<AvatarText info={projectInfo.creator} />}
            title={projectInfo.name}
            description={projectInfo.description || '这人太懒了,没写描述'}
          />
        </Card>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onDeleteProject: (id: number) => {
        return doDeleteProject.request(id);
      },
      onUpdateProject: (param: IProjectUpdateParam) => {
        return doUpdateProject.request(param);
      }
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ProjectPane);
