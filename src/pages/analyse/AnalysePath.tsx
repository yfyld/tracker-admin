import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';

import style from './Analyse.module.less';

import Indicator from '@/components/Indicator';
import PathData from '@/components/PathData';

import Filter from '@/components/Filter';
import AnalyseHeader from './components/AnalyseHeader';
import { IReportInfo, IFieldInfo, IPathAnalyseData, IPathAnalyseParam } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport, doGetPathAnalyse } from '@/store/actions';
import { IAction, IStoreState, IListData, IDate } from '@/types';
import { DYNAMIC_TIME } from '@/constants';
import AnalysePathChart from './components/AnalysePathChart';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  fieldList: IListData<IFieldInfo>;
  onGetPathAnalyseData: (param: IPathAnalyseParam) => IAction;
  projectId: number;
  pathAnalyseData: IPathAnalyseData;
  pathAnalyseParam: IPathAnalyseParam;
  analyseLoading: boolean;
}

const AnalysePath = ({
  analyseLoading,
  fieldList,
  onGetPathAnalyseData,
  projectId,
  pathAnalyseData,
  pathAnalyseParam
}: Props) => {
  const handleChange = (info: IPathAnalyseParam) => {
    info.projectId = projectId;
    onGetPathAnalyseData(info);
  };

  return (
    <div className={style.wrapper}>
      <AnalyseHeader data={{ ...pathAnalyseParam, projectId }}></AnalyseHeader>
      <div className={style.rule}>
        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>指标:</span>
          <Select
            style={{ width: 100 }}
            value={pathAnalyseParam.indicatorType}
            onChange={(indicatorType: string) => handleChange({ ...pathAnalyseParam, indicatorType })}
          >
            <Option value='PV'>总数</Option>
            <Option value='UV'> 用户数</Option>
            <Option value='APV'>人均次数</Option>
            <Option value='DPV'>日均次数</Option>
            <Option value='DUV'>日均用户数</Option>
          </Select>
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>筛选:</span>
          <Filter
            fieldList={fieldList}
            filterInfo={pathAnalyseParam.filter}
            onChange={filter => handleChange({ ...pathAnalyseParam, filter })}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>页面池:</span>
          <Indicator
            addText='+添加页面'
            hasCustomName
            type='PAGE'
            fieldList={fieldList}
            indicators={pathAnalyseParam.indicators}
            onChange={indicators => handleChange({ ...pathAnalyseParam, indicators })}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>路径:</span>
          <PathData
            indicators={pathAnalyseParam.indicators}
            pathsData={pathAnalyseParam.pathsData}
            onChange={pathsData => handleChange({ ...pathAnalyseParam, pathsData })}
          ></PathData>
        </div>
      </div>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker
              onChange={time => handleChange({ ...pathAnalyseParam, ...time })}
              value={{
                dateType: pathAnalyseParam.dateType,
                dateEnd: pathAnalyseParam.dateEnd,
                dateStart: pathAnalyseParam.dateStart
              }}
            />
          </Col>
          <Col span={6} offset={4}>
            <Group compact>
              <Select
                style={{ width: '33%' }}
                value={pathAnalyseParam.type}
                onChange={(type: string) => handleChange({ ...pathAnalyseParam, type })}
              >
                <Option value='FUNNEL'>桑椹图</Option>
                <Option value='TABLE'>表格</Option>
              </Select>

              <Button icon='download'>导出</Button>
            </Group>
          </Col>
        </Row>
        <Spin spinning={analyseLoading}>1212</Spin>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { fieldList } = state.metadata;
  const projectId = state.project.projectInfo.id;
  const { pathAnalyseData, pathAnalyseParam, analyseLoading } = state.analyse;
  return {
    fieldList,
    projectId,
    pathAnalyseData,
    pathAnalyseParam,
    analyseLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetPathAnalyseData: (param: IPathAnalyseParam) => doGetPathAnalyse.request(param)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AnalysePath);
