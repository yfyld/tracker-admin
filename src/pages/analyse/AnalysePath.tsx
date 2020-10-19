import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';

import style from './Analyse.module.less';

import Indicator from '@/components/Indicator';
import PathData from '@/components/PathData';

import Filter from '@/components/Filter';
import AnalyseHeader from './components/AnalyseHeader';
import { IReportInfo, IFieldInfo, IPathAnalyseData, IPathAnalyseParam, EMetadataType, IIndicatorInfo } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport, doGetPathAnalyse } from '@/store/actions';
import { IAction, IStoreState, IListData, IDate } from '@/types';
import { DYNAMIC_TIME, EVENT_ATTRS } from '@/constants';
import AnalysePathChart from './components/AnalysePathChart';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  onGetPathAnalyseData: (param: IPathAnalyseParam) => IAction;
  projectId: number;
  pathAnalyseData: IPathAnalyseData;
  pathAnalyseParam: IPathAnalyseParam;
  analyseLoading: boolean;
}

const AnalysePath = ({
  analyseLoading,

  onGetPathAnalyseData,
  projectId,
  pathAnalyseData,
  pathAnalyseParam
}: Props) => {
  const handleChange = (info: IPathAnalyseParam, indicator?: IIndicatorInfo) => {
    info.projectId = projectId;
    if (indicator) {
      info.childPageData = info.childPageData.filter((item) => item.parentId !== indicator.id);
      for (let i in info.childPageData) {
        info.childPageData[i].children = info.childPageData[i].children.filter((item) => item.id !== indicator.id);
      }
    }
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
            <Option value='RUV'>真实用户数</Option>
            <Option value='RAPV'>真实人均次数</Option>
            <Option value='DRUV'>日均真实用户数</Option>
          </Select>
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>筛选:</span>
          <Filter
            filterInfo={pathAnalyseParam.filter}
            onChange={(filter) => handleChange({ ...pathAnalyseParam, filter })}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>页面池:</span>
          <Indicator
            addText='+添加页面'
            hasCustomName
            // type={EMetadataType.page}
            indicators={pathAnalyseParam.indicators}
            onChange={(indicators, indicator) => handleChange({ ...pathAnalyseParam, indicators }, indicator)}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>父级页:</span>
          <PathData
            indicators={pathAnalyseParam.indicators}
            childPageData={pathAnalyseParam.childPageData}
            onChange={(childPageData) => handleChange({ ...pathAnalyseParam, childPageData: childPageData })}
          ></PathData>
        </div>
      </div>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker
              onChange={(time) => handleChange({ ...pathAnalyseParam, ...time })}
              value={{
                dateType: pathAnalyseParam.dateType,
                dateEnd: pathAnalyseParam.dateEnd,
                dateStart: pathAnalyseParam.dateStart
              }}
            />
          </Col>
          <Col span={6} offset={4}>
            <Group compact>
              <Button icon='download'>导出</Button>
            </Group>
          </Col>
        </Row>
        <Spin spinning={analyseLoading}>
          <div style={{ height: 800 }}>
            <AnalysePathChart data={pathAnalyseData}></AnalysePathChart>
          </div>
        </Spin>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  const { pathAnalyseData, pathAnalyseParam, analyseLoading } = state.analyse;
  return {
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
