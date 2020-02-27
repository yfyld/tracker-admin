import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Popover, Input, Dropdown, Divider } from 'antd';
import style from './Indicator.module.less';
import { IMetadataInfo, IMetadataListParam, IIndicatorInfo, IFieldInfo, IFilterInfo } from '@/api';
import { IPageData, IAction, IStoreState, IListData } from '@/types';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import Filter from './Filter';
const { Option, OptGroup } = Select;

const { Search } = Input;

interface Props {
  activeMetadataList: IPageData<IMetadataInfo>;
  activeMetadataListParams: IMetadataListParam;
  index?: number;
  fieldList: IListData<IFieldInfo>;
  indicators: IIndicatorInfo[];
  onChange: (param: IIndicatorInfo[]) => any;
  hasType?: boolean;
  addText?: string;
  hasCustomName?: boolean;
}

const Indicator = ({
  indicators,
  activeMetadataList,
  activeMetadataListParams,
  onChange,
  fieldList,
  hasType,
  addText = '+添加指标',
  hasCustomName = false
}: Props) => {
  function handleSelectMetadata(info: IMetadataInfo, index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators[index].trackId = info.code;
    newIndicators[index].metadataCode = info.code;
    newIndicators[index].metadataName = info.name;
    onChange(newIndicators);
  }

  function handleFilterChange(info: IFilterInfo, index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators[index].filter = info;
    onChange(newIndicators);
  }

  function handleTypeChange(value: string, index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators[index].type = value;
    onChange(newIndicators);
  }

  function handleNameChange(value: string, index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators[index].customName = value;
    onChange(newIndicators);
  }

  function handleAdd() {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators.push({
      trackId: null,
      metadataCode: null,
      metadataName: '所有事件',
      type: 'SUM',
      id: Date.now(),
      filter: {
        filterType: 'AND',
        filterValues: []
      }
    });
    onChange(newIndicators);
  }

  function handleRemove(index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators.splice(index, 1);
    onChange(newIndicators);
  }

  return (
    <div className={style.wrapper}>
      <div>
        {indicators.map((indicatorInfo, index) => (
          <div key={indicatorInfo.id}>
            <Row className={style.item} gutter={10}>
              <Col span={1}>
                <div className={style.center}>
                  <Tag color='gold'>{index + 1}</Tag>
                </div>
              </Col>
              <Col span={3}>
                <Dropdown
                  overlay={
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
                          <span
                            onClick={() => handleSelectMetadata(item, index)}
                            className='app-pointer'
                            key={item.code}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <Input value={indicatorInfo.metadataName} readOnly className={style.select} />
                </Dropdown>
              </Col>
              {hasCustomName && (
                <Col span={3}>
                  <Input
                    defaultValue={indicatorInfo.customName}
                    placeholder='自定义名称'
                    onBlur={event => handleNameChange(event.target.value, index)}
                  />
                </Col>
              )}
              {hasType && (
                <>
                  <Col span={1}>
                    <div className={style.center}>的</div>
                  </Col>
                  <Col span={3}>
                    <Select onChange={(val: string) => handleTypeChange(val, index)} value={indicatorInfo.type}>
                      <Option value='SUM'>总次数</Option>
                      <Option value='USER_SUM'>用户数</Option>
                      <Option value='3'>人均次数</Option>
                    </Select>
                  </Col>
                </>
              )}

              {indicators.length > 1 && (
                <Col span={1}>
                  <div onClick={() => handleRemove(index)} className={'app-link ' + style.center}>
                    <Icon type='close' />
                  </div>
                </Col>
              )}
            </Row>
            <div className={style.filter}>
              <Filter
                fieldList={fieldList}
                filterInfo={indicatorInfo.filter}
                onChange={filter => handleFilterChange(filter, index)}
              ></Filter>
            </div>
          </div>
        ))}
      </div>
      <a onClick={handleAdd}>{addText}</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Indicator);
