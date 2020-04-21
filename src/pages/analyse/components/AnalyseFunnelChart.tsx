import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IFunnelAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';
import AnalyseFunnelList from './AnalyseFunnelList';
import NoData from '@/components/NoData';

interface Props {
  data: IFunnelAnalyseData;
}

const getOptions = (data: IFunnelAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',

        minSize: '0%',
        maxSize: '100%',
        sort: 'none',
        gap: 2,

        label: {
          show: true,
          position: 'inside',
          formatter: function (param: any) {
            return `${param.name}(${param.value})`;
          }
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: data.list[0].allData.map((item) => ({
          name: item.customName || item.metadataName,
          value: item.count
        }))
      }
    ]
  };

  return options;
};

interface TableColumnProps {
  key: string;
  time: string;
  [prop: string]: any;
}

const getColumns = (data: IFunnelAnalyseData) => {
  let columns: ColumnProps<TableColumnProps>[] = [
    {
      title: '',
      key: 'time',
      dataIndex: 'time',
      fixed: 'left',
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      render: (text: string) => {
        if (/\d/.test(text)) {
          return moment(text).format(getFormatByTimeUnit(data.timeUnit));
        }
        return text;
      }
    }
  ];

  data.list[0].allData.forEach((item, index) => {
    if (index === 0) {
      columns.push({
        title: '总转化率',
        key: item.key,
        dataIndex: item.key + '_count',
        render: (text, record) => (
          <div>
            {record[item.key + '_count']} <span>({record[item.key + '_rate']})</span>
          </div>
        )
      });
    } else {
      columns.push({
        title: `第一步(${item.customName || item.metadataName})`,
        key: item.key,
        dataIndex: item.key + '_count',
        render: (text, record) => (
          <div>
            {record[item.key + '_count']} <span>({record[item.key + '_rate']})</span>
          </div>
        )
      });
    }
  });

  return columns;
};

const getTableData = (data: IFunnelAnalyseData): TableColumnProps[] => {
  const tableData = data.list.map((item) => {
    return {
      key: item.dimension,
      time: item.dimension,
      ...item.allData.reduce((total: { [props: string]: any }, step) => {
        total[step.key + '_count'] = step.count;
        total[step.key + '_rate'] = step.conversionRate;
        return total;
      }, {}),
      children: item.data.map((member) => ({
        key: member.time,
        time: member.time,
        ...member.steps.reduce((total: { [props: string]: any }, step) => {
          total[step.key + '_count'] = step.count;
          total[step.key + '_rate'] = step.conversionRate;
          return total;
        }, {})
      }))
    };
  });

  return tableData;
};

const AnalyseFunnelChart = ({ data }: Props) => {
  const hasData = !!data.list.find((item) => item.allData.length > 0);

  if (!hasData) {
    return <NoData></NoData>;
  }

  switch (data.type) {
    case 'TABLE': {
      const tableData = getColumns(data);
      const tableScroll = tableData.length > 5 ? { x: tableData.length * 200 } : {};
      return <Table columns={tableData} dataSource={getTableData(data)} scroll={tableScroll} />;
    }

    case 'LIST': {
      return <AnalyseFunnelList data={data}></AnalyseFunnelList>;
    }

    default:
      return (
        <ReactEcharts
          style={{ height: '100%' }}
          option={getOptions(data)}
          theme='ts'
          notMerge={true}
          lazyUpdate={true}
        />
      );
  }
};

export default AnalyseFunnelChart;
