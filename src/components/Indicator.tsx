import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Popover, Input, Dropdown, Divider } from 'antd';
import style from './Indicator.module.less';
import {
  IMetadataInfo,
  IMetadataListParam,
  IIndicatorInfo,
  IFieldInfo,
  IFilterInfo,
  ITagList,
  IFieldListParam,
  IProjectInfo
} from '@/api';
import { IPageData, IAction, IStoreState, IListData } from '@/types';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import Filter from './Filter';
import { v4 as uuidv4 } from 'uuid';
import { doGetActiveMetadataList, doGetFieldList } from '../store/actions';
import { IFieldListMap } from '@/store/reducers/metadata.reducer';
import { EVENT_ATTRS } from '@/constants';
const { Option, OptGroup } = Select;

const { Search } = Input;

interface Props {
  activeMetadataList: IPageData<IMetadataInfo>;
  activeMetadataListParams: IMetadataListParam;
  index?: number;
  fieldListMap: IFieldListMap;
  indicators: IIndicatorInfo[];
  onChange: (param: IIndicatorInfo[], changedValue?: IIndicatorInfo) => any;
  hasType?: boolean;
  addText?: string;
  hasCustomName?: boolean;
  type?: number;
  tagList: ITagList;
  onGetActiveMetadataList: (param: IMetadataListParam) => IAction;
  onGetFieldList: (param: IFieldListParam) => IAction;
  projectInfo: IProjectInfo;
}

const Indicator = ({
  indicators,
  activeMetadataList,
  activeMetadataListParams,
  onChange,
  fieldListMap,
  hasType,
  addText = '+添加指标',
  hasCustomName = false,
  type = null,
  tagList,
  onGetActiveMetadataList,
  onGetFieldList,
  projectInfo
}: Props) => {
  const [metadataparam, setmetadataparam] = React.useState({ ...activeMetadataListParams });
  React.useEffect(() => {
    setmetadataparam(activeMetadataListParams);
  }, [activeMetadataListParams]);

  function handleSelectMetadata(info: IMetadataInfo, index: number) {
    const newIndicators: IIndicatorInfo[] = JSON.parse(JSON.stringify(indicators));
    newIndicators[index].metadataCode = info.code;
    newIndicators[index].metadataName = info.name;
    newIndicators[index].projectId = info.projectId;
    onChange(newIndicators, indicators[index]);
    onGetFieldList({ projectId: info.projectId, metadataCode: info.code });
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
      metadataCode: '_ALL_METADATA',
      metadataName: '所有事件',
      projectId: null,
      type: 'PV',
      id: uuidv4(),
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
    onChange(newIndicators, indicators[index]);
  }

  function handleSearch(param: IMetadataListParam) {
    setmetadataparam(param);
    setTimeout(() => {
      onGetActiveMetadataList(param);
    }, 300);
  }

  const allMetadata = {
    name: '所有事件',
    code: '_ALL_METADATA'
  } as IMetadataInfo;

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
                  trigger={['click']}
                  overlay={
                    <div className={style.content}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Search
                          placeholder='搜索事件'
                          value={metadataparam.name}
                          onChange={(e) => setmetadataparam({ ...metadataparam, name: e.target.value })}
                          onSearch={(name) => handleSearch({ ...metadataparam, name })}
                          style={{ width: 120 }}
                        />
                        &nbsp;
                        <Select
                          placeholder='根据标签筛选'
                          style={{ width: 120 }}
                          mode='multiple'
                          value={metadataparam.tags ? metadataparam.tags.split(',').map((item) => Number(item)) : []}
                          onChange={(tags: number[]) => handleSearch({ ...metadataparam, tags: tags.join(',') })}
                        >
                          {tagList.list.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                        &nbsp;
                        <Select
                          placeholder='关联项目'
                          style={{ width: 160 }}
                          mode='multiple'
                          value={
                            metadataparam.projectIds
                              ? metadataparam.projectIds.split(',').map((item) => Number(item))
                              : []
                          }
                          onChange={(projectIds: number[]) =>
                            handleSearch({ ...metadataparam, projectIds: projectIds.join(',') })
                          }
                        >
                          {projectInfo.associationProjects.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </div>

                      <div className={style.metadataBox}>
                        {projectInfo.associationProjects ? (
                          <>
                            <span
                              onClick={() => handleSelectMetadata({ ...allMetadata }, index)}
                              className={
                                allMetadata.code === indicatorInfo.metadataCode && !indicatorInfo.projectId
                                  ? style.active
                                  : ''
                              }
                              key={allMetadata.code}
                            >
                              所有事件
                            </span>
                            <span
                              onClick={() =>
                                handleSelectMetadata(
                                  { ...allMetadata, name: projectInfo.name + '所有事件', projectId: projectInfo.id },
                                  index
                                )
                              }
                              className={
                                allMetadata.code === indicatorInfo.metadataCode &&
                                indicatorInfo.projectId === projectInfo.id
                                  ? style.active
                                  : ''
                              }
                              key={allMetadata.code + projectInfo.id}
                            >
                              {projectInfo.name}所有事件
                            </span>
                            {projectInfo.associationProjects.map((item) => (
                              <span
                                onClick={() =>
                                  handleSelectMetadata(
                                    { ...allMetadata, name: item.name + '所有事件', projectId: item.id },
                                    index
                                  )
                                }
                                className={
                                  allMetadata.code === indicatorInfo.metadataCode && indicatorInfo.projectId === item.id
                                    ? style.active
                                    : ''
                                }
                                key={allMetadata.code + item.id}
                              >
                                {item.name}所有事件
                              </span>
                            ))}
                          </>
                        ) : (
                          <span
                            onClick={() => handleSelectMetadata({ ...allMetadata, projectId: projectInfo.id }, index)}
                            className={allMetadata.code === indicatorInfo.metadataCode ? style.active : ''}
                            key={allMetadata.code + projectInfo.id}
                          >
                            所有事件
                          </span>
                        )}

                        {activeMetadataList.list
                          .filter((item) => {
                            if (!type) {
                              return true;
                            }
                            return item.type === type;
                          })
                          .map((item) => (
                            <span
                              onClick={() => handleSelectMetadata(item, index)}
                              className={item.code === indicatorInfo.metadataCode ? style.active : ''}
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
                    onBlur={(event) => handleNameChange(event.target.value, index)}
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
                      <Option value='PV'>总次数</Option>
                      <Option value='UV'>用户数</Option>
                      <Option value='APV'>人均次数</Option>
                      <Option value='DPV'>日均次数</Option>
                      <Option value='DUV'>日均用户数</Option>
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
                fieldList={fieldListMap[indicatorInfo.metadataCode] || { list: EVENT_ATTRS }}
                filterInfo={indicatorInfo.filter}
                onChange={(filter) => handleFilterChange(filter, index)}
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
  const { activeMetadataList, activeMetadataListParams, tagList, fieldListMap } = state.metadata;
  const { projectInfo } = state.project;
  return {
    activeMetadataList,
    activeMetadataListParams,
    tagList,
    fieldListMap,
    projectInfo
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetActiveMetadataList: (param) => doGetActiveMetadataList.request(param),
      onGetFieldList: (param) => doGetFieldList.request(param)
    },

    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Indicator);
