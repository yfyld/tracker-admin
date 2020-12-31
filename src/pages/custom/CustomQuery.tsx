import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin, Table, AutoComplete } from 'antd';
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

  const dataSourceCache: { value: string; text: string }[] = JSON.parse(
    window.localStorage.getItem('TELESCOPE_QUERY_DATA_SOURCE') || '[]'
  );
  const [dataSource, setDataSource] = React.useState(dataSourceCache);

  const [loading, setloading] = React.useState(false);

  const handleQuery = () => {
    setloading(true);
    if (param.query && !dataSourceCache.find((item) => item.value === param.query)) {
      dataSourceCache.unshift({ value: param.query, text: param.query });
      if (dataSourceCache.length > 100) {
        dataSourceCache.length = 100;
      }
      window.localStorage.setItem('TELESCOPE_QUERY_DATA_SOURCE', JSON.stringify(dataSourceCache));
    }

    fetchCustomAnalyseData({ ...param, projectId })
      .then((res) => {
        setResult(res.data);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const handleSearch = (searchText: string) => {
    setDataSource(dataSourceCache.filter((item) => item.value.indexOf(searchText) >= 0));
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
        if (/time$/i.test(key)) {
          columns.push({
            title: key,
            key: key,
            dataIndex: key,
            render: (text: number) => dayjs(Number(text)).format('YYYY-MM-DD HH:mm:ss')
          });
        } else if (key === 'custom') {
          columns.push({
            title: key,
            key: key,
            dataIndex: key,
            render: (text: string) => {
              return text && unescape(text.replace(/\\u/gi, '%u'));
            }
          });
        } else {
          columns.push({
            title: key,
            key: key,
            dataIndex: key
          });
        }
      }
    }
    return columns;
  };

  return (
    <div className={style.wrapper}>
      <div className={style.preview}>
        <Row>
          <Col span={12}>
            <AutoComplete
              style={{ width: '100%' }}
              value={param.query}
              dataSource={dataSource}
              onSearch={handleSearch}
              onChange={(val) => handleChange({ ...param, query: val })}
            ></AutoComplete>
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
            <Table columns={getTableColumns(result)} bordered dataSource={result} rowKey='id' />

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
