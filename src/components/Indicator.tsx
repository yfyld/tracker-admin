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
  const [indicatorInfo, setindicatorInfo] = React.useState<{ target: string; metadata: IMetadataInfo }>({
    metadata: {
      id: null,
      name: null,
      code: null,
      type: null,
      description: null,
      status: null,
      projectId: null,
      tags: []
    },
    target: '1'
  });
  function handleSelectMetadata(info: IMetadataInfo) {
    setindicatorInfo({
      ...indicatorInfo,
      metadata: info
    });
  }

  function handleTargetChange(value: string) {
    setindicatorInfo({
      ...indicatorInfo,
      target: value
    });
  }

  const content = (
    <div className={style.content}>
      <div onClick={e => e.stopPropagation()}>
        <Search placeholder='搜索事件' onSearch={value => console.log(value)} style={{ width: 200 }} />
        <Select style={{ width: 200 }}>
          <Option value='1'>标签1</Option>
          <Option value='2'>标签2</Option>
          <Option value='3'>标签3</Option>
        </Select>
      </div>

      <div className={style.metadataBox}>
        {activeMetadataList.list.map(item => (
          <span onClick={() => handleSelectMetadata(item)} className='pointer' key={item.code}>
            {item.name}
          </span>
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
            <Input value={indicatorInfo.metadata.name} readOnly className={style.select} />
          </Dropdown>
        </Col>
        <Col span={1}>
          <div className={style.center}>的</div>
        </Col>
        <Col span={3}>
          <Select onChange={handleTargetChange} value={indicatorInfo.target}>
            <Option value='1'>总次数</Option>
            <Option value='2'>用户数</Option>
            <Option value='3'>人均次数</Option>
          </Select>
        </Col>

        {!!index && (
          <Col span={1}>
            <div className={'link ' + style.center}>
              <Icon type='close' />
            </div>
          </Col>
        )}
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
