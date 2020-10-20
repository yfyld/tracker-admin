import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import moment from 'moment';
import style from './AnalyseFunnel.module.less';
import ReactEcharts from 'echarts-for-react';
import Indicator from '@/components/Indicator';
import Dimension from '@/components/Dimension';
import Filter from '@/components/Filter';
import AnalyseHeader from './components/AnalyseHeader';
import { IReportInfo, IFieldInfo, IFunnelAnalyseData, IFunnelAnalyseParam } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport, doGetFunnelAnalyse } from '@/store/actions';
import { IAction, IStoreState, IListData, IDate } from '@/types';
import { DYNAMIC_TIME, EVENT_ATTRS } from '@/constants';
import AnalyseFunnelChart from './components/AnalyseFunnelChart';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  onGetFunnelAnalyseData: (param: IFunnelAnalyseParam) => IAction;
  projectId: number;
  funnelAnalyseData: IFunnelAnalyseData;
  funnelAnalyseParam: IFunnelAnalyseParam;
  analyseLoading: boolean;
}

const AnalyseFunnel = ({
  analyseLoading,

  onGetFunnelAnalyseData,
  projectId,
  funnelAnalyseData,
  funnelAnalyseParam
}: Props) => {
  const handleChange = (info: IFunnelAnalyseParam) => {
    info.projectId = projectId;
    onGetFunnelAnalyseData(info);
  };

  return (
    <div className={style.wrapper}>
      <AnalyseHeader data={{ ...funnelAnalyseParam, projectId }}></AnalyseHeader>
      <div className={style.rule}>
        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>指标:</span>

          <Select
            value={funnelAnalyseParam.indicatorType}
            onChange={(indicatorType: string) => handleChange({ ...funnelAnalyseParam, indicatorType })}
          >
            <Option value='PV'>总数</Option>
            <Option value='UV'> 用户数</Option>
            <Option value='APV'>人均次数</Option>
            <Option value='DPV'>日均次数</Option>
            <Option value='DUV'>日均用户数</Option>
            {/* <Option value='RUV'>真实用户数</Option>
            <Option value='RAPV'>真实人均次数</Option>
            <Option value='DRUV'>日均真实用户数</Option> */}
          </Select>
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>纬度:</span>
          <Dimension
            dimension={funnelAnalyseParam.dimension}
            onChange={(dimension) => handleChange({ ...funnelAnalyseParam, dimension })}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>筛选:</span>
          <Filter
            filterInfo={funnelAnalyseParam.filter}
            onChange={(filter) => handleChange({ ...funnelAnalyseParam, filter })}
          />
        </div>

        <div className={style.ruleSection}>
          <span className={style.ruleTitle}>漏斗步骤:</span>
          <Indicator
            addText='+添加步骤'
            hasCustomName
            indicators={funnelAnalyseParam.indicators}
            onChange={(indicators) => handleChange({ ...funnelAnalyseParam, indicators })}
          />
        </div>
      </div>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker
              onChange={(time) => handleChange({ ...funnelAnalyseParam, ...time })}
              value={{
                dateType: funnelAnalyseParam.dateType,
                dateEnd: funnelAnalyseParam.dateEnd,
                dateStart: funnelAnalyseParam.dateStart
              }}
            />
          </Col>
          <Col span={6} offset={4}>
            <Group compact>
              <Select
                style={{ width: '33%' }}
                value={funnelAnalyseParam.type}
                onChange={(type: string) => handleChange({ ...funnelAnalyseParam, type })}
              >
                <Option value='FUNNEL'>漏斗图</Option>
                <Option value='LIST'>列表</Option>
                <Option value='TABLE'>表格</Option>
              </Select>

              <Button icon='download'>导出</Button>
            </Group>
          </Col>
        </Row>
        <Spin spinning={analyseLoading}>
          <div style={{ height: funnelAnalyseParam.type === 'FUNNEL' ? 600 : 1000 }}>
            <AnalyseFunnelChart data={funnelAnalyseData}></AnalyseFunnelChart>
          </div>
        </Spin>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  const { funnelAnalyseData, funnelAnalyseParam, analyseLoading } = state.analyse;
  return {
    projectId,
    funnelAnalyseData,
    funnelAnalyseParam,
    analyseLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetFunnelAnalyseData: (param: IFunnelAnalyseParam) => doGetFunnelAnalyse.request(param)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseFunnel);
