import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import moment from 'moment';
import style from './AnalyseEvent.module.less';
import ReactEcharts from 'echarts-for-react';
import Indicator from '@/components/Indicator';
import Dimension from '@/components/Dimension';
import Filter from '@/components/Filter';
import AnalyseHeader from './components/AnalyseHeader';
import { IReportInfo, IFieldInfo, IEventAnalyseData, IEventAnalyseParam } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport, doGetEventAnalyse } from '@/store/actions';
import { IAction, IStoreState, IListData, IDate } from '@/types';
import { DYNAMIC_TIME } from '@/constants';
import AnalyseEventChart from './components/AnalyseEventChart';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  fieldList: IListData<IFieldInfo>;
  onGetEventAnalyseData: (param: IEventAnalyseParam) => IAction;
  projectId: number;
  eventAnalyseData: IEventAnalyseData;
  eventAnalyseParam: IEventAnalyseParam;
  analyseLoading: boolean;
}

const AnalyseEvent = ({
  analyseLoading,
  fieldList,
  onGetEventAnalyseData,
  projectId,
  eventAnalyseData,
  eventAnalyseParam
}: Props) => {
  const handleChange = (info: IEventAnalyseParam) => {
    info.projectId = projectId;
    onGetEventAnalyseData(info);
  };

  return (
    <div>
      <AnalyseHeader data={{ ...eventAnalyseParam, projectId }}></AnalyseHeader>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='添加分析规则' key='1'>
          <div>
            <div className={style.ruleTitle}>
              <span>指标:</span>
            </div>
            <div>
              <Indicator
                fieldList={fieldList}
                indicators={eventAnalyseParam.indicators}
                onChange={indicators => handleChange({ ...eventAnalyseParam, indicators })}
              />

              {/* <Filter fieldList={fieldList} filterInfo={filter} /> */}
            </div>
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>维度:</span>
            </div>
            <Dimension
              dimension={eventAnalyseParam.dimension}
              fieldList={fieldList}
              onChange={dimension => handleChange({ ...eventAnalyseParam, dimension })}
            />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>筛选:</span>
            </div>
            <Filter
              fieldList={fieldList}
              filterInfo={eventAnalyseParam.filter}
              onChange={filter => handleChange({ ...eventAnalyseParam, filter })}
            />
          </div>
        </Panel>
      </Collapse>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker
              pickerProps={{ allowClear: false }}
              onChange={time => handleChange({ ...eventAnalyseParam, ...time })}
              value={{
                dateType: eventAnalyseParam.dateType,
                dateEnd: eventAnalyseParam.dateEnd,
                dateStart: eventAnalyseParam.dateStart
              }}
            />
          </Col>
          <Col span={6} offset={4}>
            <Group compact>
              <Select
                style={{ width: '33%' }}
                value={eventAnalyseParam.type}
                onChange={(type: string) => handleChange({ ...eventAnalyseParam, type })}
              >
                <Option value='LINE'>折线图</Option>
                <Option value='PIE'>饼图</Option>
                <Option value='TABLE'>表格</Option>
                <Option value='TEXT'>数值</Option>
              </Select>
              <Select
                style={{ width: '33%' }}
                value={eventAnalyseParam.timeUnit}
                onChange={(timeUnit: string) => handleChange({ ...eventAnalyseParam, timeUnit })}
              >
                <Option value='HOUR'>按小时</Option>
                <Option value='DAY'>按天</Option>
                <Option value='WEEK'>按周</Option>
                <Option value='MONTH'>按月</Option>
                <Option value='YEAR'>按年</Option>
              </Select>
              <Button icon='download'>导出</Button>
            </Group>
          </Col>
        </Row>
        <Spin spinning={analyseLoading}>
          <AnalyseEventChart data={eventAnalyseData}></AnalyseEventChart>
        </Spin>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { fieldList } = state.metadata;
  const projectId = state.project.projectInfo.id;
  const { eventAnalyseData, eventAnalyseParam, analyseLoading } = state.analyse;
  return {
    fieldList,
    projectId,
    eventAnalyseData,
    eventAnalyseParam,
    analyseLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetEventAnalyseData: (param: IEventAnalyseParam) => doGetEventAnalyse.request(param)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseEvent);
