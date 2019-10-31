import * as React from 'react';
import style from './BoardPane.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { IReportInfo } from '@/api';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';

interface Props {
  reportInfo: IReportInfo;
  startDate?: number;
  endDate?: number;
}

const BoardPane = ({ reportInfo }: Props) => {
  const { dateStart, dateEnd, dateType } = reportInfo;
  const menu = (
    <Menu>
      <Menu.Item>设置</Menu.Item>
      <Menu.Item>
        <Link to={`/project/${reportInfo.projectId}/analyse-event/${reportInfo.id}`}>编辑</Link>
      </Menu.Item>
      <Menu.Item>删除</Menu.Item>
    </Menu>
  );
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>{reportInfo.name}</h3>
        <div className={style.menu}>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <Icon type='menu' />
          </Dropdown>
        </div>
      </div>
      <div className={style.body}>
        <DateParse dateStart={dateStart} dateEnd={dateEnd} dateType={dateType}></DateParse>
        <div>{reportInfo.description}</div>
        <div>
          <ChartLine></ChartLine>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

const mapStateToProps = (state: IStoreState) => {
  //const { projectList } = state.project
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPane);
