import { Tabs, Form } from 'antd';
import * as React from 'react';
import ProjectInfo from './components/ProjectInfo';
import ProjectMember from './components/ProjectMember';
import ProjectCode from './components/ProjectCode';

const TabPane = Tabs.TabPane;

interface Props {}

const Project = (props: Props) => {
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='基本信息' key='1'>
          <ProjectInfo></ProjectInfo>
        </TabPane>
        <TabPane tab='成员' key='2'>
          <ProjectMember></ProjectMember>
        </TabPane>
        <TabPane tab='SDK' key='3'>
          <ProjectCode></ProjectCode>
        </TabPane>
        {/* <TabPane tab="设置" key="3">
          Content of Tab Pane 3
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Form.create()(Project);
