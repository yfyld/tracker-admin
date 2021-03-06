import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Popover, Input, Dropdown, Divider } from 'antd';
import style from './Indicator.module.less';
import { IMetadataInfo, IMetadataListParam } from '@/api';
import { IPageData, IAction, IStoreState } from '@/types';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
const { Option, OptGroup } = Select;

const { Search } = Input;

interface IndicatorItem {
  event?: string;
}

interface Props {
  indicators?: IndicatorItem[];
  activeMetadataList: IPageData<IMetadataInfo>;
  activeMetadataListParams: IMetadataListParam;
  index?: number;
}

const Indicator = ({ indicators, activeMetadataList, activeMetadataListParams, index = 0 }: Props) => {
  const content = (
    <div className={style.content}>
      <div>
        <Search placeholder='搜索事件' onSearch={value => console.log(value)} style={{ width: 200 }} />
        <Select style={{ width: 200 }}>
          <Option value='1'>总次数</Option>
          <Option value='1'>用户数</Option>
          <Option value='1'>国家</Option>
          <Option value='1'>操作系统</Option>
        </Select>
      </div>
      <Divider />
      <div className={style.metadataBox}>
        {activeMetadataList.list.map(item => (
          <span key={item.code}>{item.name}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className={style.wrapper}>
      <Row className={style.item}>
        <Col span={1}>
          <div className={style.center}>
            <Tag color='gold'>{index + 1}</Tag>
          </div>
        </Col>
        <Col span={3}>
          <Dropdown overlay={content}>
            <div className={style.select}>指标</div>
          </Dropdown>
        </Col>
        <Col span={1}>
          <div className={style.center}>的</div>
        </Col>
        <Col span={3}>
          <Select>
            <Option value='1'>总次数</Option>
            <Option value='1'>用户数</Option>
            <Option value='1'>国家</Option>
            <Option value='1'>操作系统</Option>
          </Select>
        </Col>

        <Col span={2}>
          <div className={'link ' + style.center}>添加筛选</div>
        </Col>
        <Col span={1}>
          <div className={'link ' + style.center}>
            <Icon type='close' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { activeMetadataList, activeMetadataListParams } = state.metadata;
  return {
    activeMetadataList,
    activeMetadataListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Indicator);
