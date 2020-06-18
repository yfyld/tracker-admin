import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin, Table } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';

import style from './CustomQuery.module.less';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';

import { connect } from 'react-redux';

import { IAction, IStoreState, IListData, IDate } from '@/types';
import { fetchCustomAnalyseData } from '@/api';
import { DYNAMIC_TIME } from '@/constants';
import dayjs from 'dayjs';
import { getFormatByTimeUnit } from '@/utils';
import { ColumnProps } from 'antd/lib/table';

interface Props {
  projectId: number;
}

const CustomQuery = ({ projectId }: Props) => {
  const handleChange = (info: any) => {
    setparam(info);
  };

  const [param, setparam] = React.useState({
    dateStart: DYNAMIC_TIME[1].startDate(),
    dateEnd: DYNAMIC_TIME[1].endDate(),
    dateType: DYNAMIC_TIME[1].value,
    query: ''
  });

  const [result, setResult] = React.useState([]);

  const [loading, setloading] = React.useState(false);

  const handleQuery = () => {
    fetchCustomAnalyseData({ ...param, projectId }).then((res) => {
      setResult(res.data);
    });
  };

  const getOptions = (data: any[]): ObjectMap => {
    const options: ObjectMap = {
      grid: {
        bottom: 60,
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: true,
        bottom: 0
      },
      xAxis: {
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#DDD'
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#333'
          }
        },
        nameTextStyle: {
          color: '#999'
        },
        splitArea: {
          show: false
        }
      },
      series: [
        {
          type: 'line',
          data: data.map((val) => {
            return {
              name: data[0].metadataName,
              value: [val.time, Number(val.count)]
            };
          })
        }
      ]
    };

    return options;
  };

  const getTableColumns = (data: any[]) => {
    let columns = [] as ColumnProps<any>[];
    if (data.length > 0) {
      for (let key in data[0]) {
        if (/^__/.test(key)) {
          continue;
        }
        columns.push({
          title: key,
          key: key,
          dataIndex: key
        });
      }
    }
    return columns;
  };
  return (
    <div className={style.wrapper}>
      <div className={style.preview}>
        <Row>
          <Col span={12}>
            <Input value={param.query} onChange={(val) => handleChange({ ...param, query: val.target.value })}></Input>
          </Col>
          <Col span={10}>
            <AnalyseRangePicker
              pickerProps={{ allowClear: false }}
              onChange={(time) => handleChange({ ...param, ...time })}
              value={{
                dateType: param.dateType,
                dateEnd: param.dateEnd,
                dateStart: param.dateStart
              }}
            />
          </Col>
          <Col span={2}>
            <Button onClick={handleQuery}>查询</Button>
          </Col>
        </Row>
        <br />
        <br />
        <div className='app-tablePage-table'>
          <Spin spinning={loading}>
            <Table columns={getTableColumns(result)} bordered dataSource={result} />

            <br />
            <br />
          </Spin>
        </div>

        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  return {
    projectId
  };
};

export default connect(mapStateToProps, null)(CustomQuery);
