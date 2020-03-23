import * as React from 'react';
import style from './ProjectList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IPageData } from '@/types';

import { Button, Pagination, Table, Modal, Input, message } from 'antd';
import AppHeader from '@/components/AppHeader';
import ProjectPane from './components/ProjectPane';
import { IProjectListItem, IProjectListParam, IProjectInfo, IProjectUpdateParam } from '@/api';
import ProjectAddModel from './components/ProjectAddModel';

import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doGetProjectList, doDeleteProject, doUpdateProject } from '@/store/actions';
import ProjectListForm from './components/ProjectListForm';
import { ColumnProps } from 'antd/lib/table';
import ProjectUpdateModal from './components/ProjectUpdateModal';
import { ROUTE_PATH } from '@/constants';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
const { confirm } = Modal;

interface Props {
  projectList: IPageData<IProjectListItem>;
  projectListParams: IProjectListParam;
  onGetProjectList: (param: IProjectListParam) => IAction;
  onDeleteProject: (id: number) => IAction;
  onUpdateProject: (param: IProjectUpdateParam) => IAction;
}

const ProjectList = ({ projectList, onGetProjectList, projectListParams, onDeleteProject, onUpdateProject }: Props) => {
  const [addProjectVisible, setAddProjectVisible] = React.useState(false);
  const [updateProjectVisible, setUpdateProjectVisible] = React.useState(false);
  const [shouldUpdateProject, setshouldUpdateProject] = React.useState<IProjectListItem>(null);
  const [shouldDelProject, setshouldDelProject] = React.useState<IProjectListItem>(null);

  React.useEffect(() => {
    if (shouldDelProject) {
      handleDelete(shouldDelProject);
    }
  }, [shouldDelProject]);

  const columns: ColumnProps<IProjectListItem>[] = [
    {
      key: 'name',
      title: '项目名称',
      dataIndex: 'name',
      render: (text, record) => <Link to={`${ROUTE_PATH.analyseEvent}?projectId=${record.id}`}>{text}</Link>
    },
    {
      key: 'log',
      title: '产生日志',
      dataIndex: 'log'
    },
    {
      key: 'description',
      title: '备注',
      dataIndex: 'description'
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (text, record) => (
        <span>
          <Link to={`${ROUTE_PATH.analyseEvent}?projectId=${record.id}`}>
            <Button type='link' size='small'>
              查看
            </Button>
          </Link>
          <Button type='link' size='small' onClick={() => handleUpdate(record)}>
            编辑
          </Button>
          <Button type='link' size='small' onClick={() => setshouldDelProject(record)}>
            删除
          </Button>
        </span>
      )
    }
  ];

  const handleUpdate = (info: IProjectListItem) => {
    setshouldUpdateProject(info);
    setUpdateProjectVisible(true);
  };

  const handleDelete = (info: IProjectListItem) => {
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
        if (name === shouldDelProject.name) {
          onDeleteProject(shouldDelProject.id);
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

  console.log('------');
  console.log(projectList);

  return (
    <div className={style.wrapper}>
      {shouldUpdateProject && (
        <ProjectUpdateModal
          orginInfo={shouldUpdateProject}
          visible={updateProjectVisible}
          onClose={setUpdateProjectVisible}
          onSubmit={onUpdateProject}
        ></ProjectUpdateModal>
      )}
      <ProjectAddModel visible={addProjectVisible} onClose={setAddProjectVisible}></ProjectAddModel>

      <div className={style.header}>
        <ProjectListForm defaultValue={projectListParams} onSubmit={onGetProjectList}></ProjectListForm>
        <Button type='primary' onClick={() => setAddProjectVisible(true)}>
          新建项目
        </Button>
      </div>
      {/* <div className={style.listBox}>
        {projectList.list.map(project => (
          <ProjectPane key={project.id} shouldUpdateProject={project} />
        ))}
      </div> */}
      <div className={style.table}>
        <Table rowKey='id' columns={columns} dataSource={projectList.list} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectList, projectListParams } = state.project;
  return {
    projectList,
    projectListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetProjectList: (params: IProjectListParam) => {
        return doGetProjectList.request(params);
      },
      onDeleteProject: (id: number) => {
        return doDeleteProject.request(id);
      },
      onUpdateProject: (param: IProjectUpdateParam) => {
        return doUpdateProject.request(param);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
