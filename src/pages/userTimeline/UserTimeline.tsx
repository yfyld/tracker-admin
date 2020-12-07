import { Icon, Collapse, Divider, Select, Input, Row, Col, Button, Spin, Table, Timeline, Popover } from 'antd';
import React from 'react';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';

import style from './UserTimeline.module.less';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';

import { connect } from 'react-redux';

import { IAction, IStoreState, IListData, IDate } from '@/types';
import { fetchCustomAnalyseData, fetchUserTimelineAnalyseData } from '@/api';
import { DYNAMIC_TIME } from '@/constants';
import dayjs from 'dayjs';
import { getFormatByTimeUnit, getSearchParams } from '@/utils';
import { ColumnProps } from 'antd/lib/table';

interface Props {
  projectId: number;
  search: string;
}

const UserTimeline = ({ projectId, search }: Props) => {
  const handleChange = (info: any) => {
    setparam(info);
  };

  const searchParam = getSearchParams(search);

  const [param, setparam] = React.useState({
    dateStart: searchParam.dateStart ? Number(searchParam.dateStart) : DYNAMIC_TIME[1].startDate(),
    dateEnd: searchParam.dateEnd ? Number(searchParam.dateEnd) : DYNAMIC_TIME[1].endDate(),
    uid: searchParam.uid || '',
    deviceId: searchParam.deviceId || '',
    ip: searchParam.ip || '',
    dateType: searchParam.dateStart ? '' : DYNAMIC_TIME[1].value
  });

  React.useEffect(() => {
    //有参数自动查
    if (param.uid || param.deviceId || param.ip) {
      handleQuery();
    }
  }, [search]);

  const [result, setResult] = React.useState<{ [props: string]: any }[]>([]);

  const [loading, setloading] = React.useState(false);

  const handleQuery = () => {
    fetchUserTimelineAnalyseData({ ...param, projectId }).then((res) => {
      setResult(res.data);
    });
  };

  const logContent = (context: { [prop: string]: string }) => {
    return (
      <div style={{ width: 680, height: 500, overflow: 'auto' }}>
        {Object.entries(context).map(([key, value]) => {
          return (
            <div>
              <h4>{key}</h4>
              <p>{typeof value === 'string' ? unescape(value.replace(/\\u/gi, '%u')) : value}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.preview}>
        <Row>
          <Col span={4}>
            <Input
              placeholder='uid'
              value={param.uid}
              onChange={(val) => handleChange({ ...param, uid: val.target.value })}
            ></Input>
          </Col>
          <Col span={4}>
            <Input
              placeholder='deviceId'
              value={param.deviceId}
              onChange={(val) => handleChange({ ...param, deviceId: val.target.value })}
            ></Input>
          </Col>
          <Col span={4}>
            <Input
              placeholder='ip'
              value={param.ip}
              onChange={(val) => handleChange({ ...param, ip: val.target.value })}
            ></Input>
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
            <Timeline mode='alternate'>
              {result.map((item) => (
                <Timeline.Item color='green' dot={<Icon type='clock-circle-o' style={{ fontSize: '16px' }} />}>
                  <div>
                    <Popover trigger='click' content={logContent(item)} title='日志详情'>
                      <div>{dayjs(Number(item.trackTime)).format('YYYY-MM-DD HH:mm:ss')}</div>
                      <div>
                        {item.actionType === 'PAGE' ? '访问了' : '触发了'}{' '}
                        <strong>{item.trackName || item.trackId}</strong>{' '}
                      </div>
                      {item.actionType === 'PAGE' && (
                        <div>{item.durationTime ? item.durationTime / 1000 + '秒' : '访问时间太短或未获取'}</div>
                      )}
                      <div>
                        {item.appid === 'null' ? 'H5' : 'APP'},项目版本:{item.version},系统:{item.os},浏览器:
                        {item.browser}
                      </div>
                    </Popover>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Spin>
        </div>

        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  const { search } = state.router.location;
  return {
    projectId,
    search
  };
};

export default connect(mapStateToProps, null)(UserTimeline);
