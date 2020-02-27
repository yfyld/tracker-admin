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
import { DYNAMIC_TIME } from '@/constants';
import AnalyseFunnelChart from './components/AnalyseFunnelChart';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  fieldList: IListData<IFieldInfo>;
  onGetFunnelAnalyseData: (param: IFunnelAnalyseParam) => IAction;
  projectId: number;
  funnelAnalyseData: IFunnelAnalyseData;
  funnelAnalyseParam: IFunnelAnalyseParam;
  analyseLoading: boolean;
}

const AnalyseFunnel = ({
  analyseLoading,
  fieldList,
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
    <div>
      <AnalyseHeader data={{ ...funnelAnalyseParam, projectId }}></AnalyseHeader>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='添加漏斗分析规则' key='1'>
          <div>
            <div className={style.ruleTitle}>
              <span>指标:</span>
            </div>

            <Select
              value={funnelAnalyseParam.indicatorType}
              onChange={(indicatorType: string) => handleChange({ ...funnelAnalyseParam, indicatorType })}
            >
              <Option value='PV'>总数</Option>
              <Option value='UV'> 用户数</Option>
              <Option value='APV'>人均次数</Option>
              <Option value='DPV'>日均次数</Option>
              <Option value='DUV'>日均用户数</Option>
            </Select>
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>维度:</span>
            </div>
            <Dimension
              dimension={funnelAnalyseParam.dimension}
              fieldList={fieldList}
              onChange={dimension => handleChange({ ...funnelAnalyseParam, dimension })}
            />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>筛选:</span>
            </div>
            <Filter
              fieldList={fieldList}
              filterInfo={funnelAnalyseParam.filter}
              onChange={filter => handleChange({ ...funnelAnalyseParam, filter })}
            />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>漏斗步骤:</span>
            </div>
            <Indicator
              addText='+添加步骤'
              hasCustomName
              fieldList={fieldList}
              indicators={funnelAnalyseParam.indicators}
              onChange={indicators => handleChange({ ...funnelAnalyseParam, indicators })}
            />
          </div>
        </Panel>
      </Collapse>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker
              onChange={time => handleChange({ ...funnelAnalyseParam, ...time })}
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
          <AnalyseFunnelChart data={funnelAnalyseData}></AnalyseFunnelChart>
        </Spin>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { fieldList } = state.metadata;
  const projectId = state.project.projectInfo.id;
  const { funnelAnalyseData, funnelAnalyseParam, analyseLoading } = state.analyse;
  return {
    fieldList,
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
