import * as React from 'react';
import style from './ProjectList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IPageData } from '@/types';

import { Button, Pagination } from 'antd';
import AppHeader from '@/components/AppHeader';
import ProjectPane from './components/ProjectPane';
import { IProjectListItem, IProjectListParam } from '@/api';
import ProjectAddModel from './components/ProjectAddModel';

import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doGetProjectList } from '@/store/actions';
import ProjectListForm from './components/ProjectListForm';

interface Props {
  projectList: IPageData<IProjectListItem>;
  projectListParams: IProjectListParam;
  handleSubmit: (param: IProjectListParam) => IAction;
}

const ProjectList = ({ projectList, handleSubmit, projectListParams }: Props) => {
  const [addProjectVisible, setAddProjectVisible] = React.useState(false);

  return (
    <div className={style.wrapper}>
      <ProjectAddModel visible={addProjectVisible} onClose={setAddProjectVisible}></ProjectAddModel>
      <AppHeader alone />
      <div>
        <ProjectListForm defaultValue={projectListParams} onSubmit={handleSubmit}></ProjectListForm>
        <Button onClick={() => setAddProjectVisible(true)} size='small'>
          新建项目
        </Button>
      </div>
      {projectList.list.map(project => (
        <ProjectPane key={project.id} projectInfo={project} />
      ))}
      <Pagination
        onChange={(page, pageSize) => handleSubmit({ ...projectListParams, page, pageSize })}
        pageSize={projectListParams.pageSize}
        current={projectListParams.page}
        total={projectList.totalCount}
      />
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
      handleSubmit: (params: IProjectListParam) => {
        return doGetProjectList.request(params);
      }
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
