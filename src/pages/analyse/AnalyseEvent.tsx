import { Icon, Collapse, Divider, Select, Input, Row, Col, Button } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import moment from 'moment';
import style from './AnalyseEvent.module.less';
import ReactEcharts from 'echarts-for-react';
import Indicator from '@/components/Indicator';
import Dimension from '@/components/Dimension';
import Filter from '@/components/Filter';
import AnalyseHeader from './components/AnalyseHeader';
import { IReportInfo, IFieldInfo, IFilterInfo, IEventQuery } from '@/api';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport } from '@/store/actions';
import { IAction, IStoreState, IListData, IDate } from '@/types';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
const { Option } = Select;
const { Panel } = Collapse;
const { Group } = Input;
interface Props {
  reportInfo: IReportInfo;
  fieldList: IListData<IFieldInfo>;
}

const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }
  ]
};

const onChange = (param: IDate) => {};

const AnalyseEvent = ({ reportInfo, fieldList }: Props) => {
  const [newInfo, setNewInfo] = React.useState(reportInfo);

  const [query, setquery] = React.useState<IEventQuery>({
    indicators: [
      {
        trackId: 'aaa',
        type: 'SUM',
        id: 1,
        filter: {
          filterType: 'OR',
          filterValues: []
        }
      }
    ],
    dimension: '',
    filter: {
      filterType: 'OR',
      filterValues: []
    },
    time: {
      date: [],
      type: ''
    },
    type: 'LINE',
    timeUlit: 'DAY'
  });

  const handleChange = (info: IEventQuery) => {
    setquery(info);
    console.log(info);
  };

  return (
    <div>
      <AnalyseHeader reportInfo={newInfo}></AnalyseHeader>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='添加分析规则' key='1'>
          <div>
            <div className={style.ruleTitle}>
              <span>指标:</span>
            </div>
            <div>
              <Indicator
                fieldList={fieldList}
                indicators={query.indicators}
                onChange={indicators => handleChange({ ...query, indicators })}
              />

              {/* <Filter fieldList={fieldList} filterInfo={filter} /> */}
            </div>
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>维度:</span>
            </div>
            <Dimension
              dimension={query.dimension}
              fieldList={fieldList}
              onChange={dimension => handleChange({ ...query, dimension })}
            />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>筛选:</span>
            </div>
            <Filter
              fieldList={fieldList}
              filterInfo={query.filter}
              onChange={filter => handleChange({ ...query, filter })}
            />
          </div>
        </Panel>
      </Collapse>

      <div className={style.preview}>
        <Row>
          <Col span={14}>
            <AnalyseRangePicker onChange={time => handleChange({ ...query, time })} value={query.time} />
          </Col>
          <Col span={6} offset={4}>
            <Group compact>
              <Select
                style={{ width: '33%' }}
                value={query.type}
                onChange={(type: string) => handleChange({ ...query, type })}
              >
                <Option value='LINE'>折线图</Option>
                <Option value='PIE'>饼图</Option>
                <Option value='TABLE'>表格</Option>
                <Option value='NUMBER'>数值</Option>
              </Select>
              <Select
                style={{ width: '33%' }}
                value='DAY'
                onChange={(timeUlit: string) => handleChange({ ...query, timeUlit })}
              >
                <Option value='HOURS'>按小时</Option>
                <Option value='DAY'>按天</Option>
                <Option value='WEEK'>按周</Option>
                <Option value='MONTH'>按月</Option>
                <Option value='YEAR'>按年</Option>
              </Select>
              <Button icon='download'>导出</Button>
            </Group>
          </Col>
        </Row>
        <div>
          <pre>
            <code></code>
          </pre>
        </div>
        <div>
          <ReactEcharts option={options} notMerge={true} lazyUpdate={true} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { reportInfo } = state.report;
  const { fieldList } = state.metadata;
  return {
    reportInfo,
    fieldList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseEvent);
