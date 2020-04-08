import * as React from 'react';
import { Tag, Select, Row, Col, Icon, Popover, Input, Dropdown, Divider, Button } from 'antd';
import style from './Indicator.module.less';
import {
  IMetadataInfo,
  IMetadataListParam,
  IIndicatorInfo,
  IFieldInfo,
  IFilterInfo,
  ITagList,
  IChildPageData
} from '@/api';
import { IPageData, IAction, IStoreState, IListData } from '@/types';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import Filter from './Filter';
import { doGetActiveMetadataList } from '../store/actions';
import { v4 as uuidv4 } from 'uuid';

const { Option, OptGroup } = Select;

const { Search } = Input;

interface Props {
  parentInfo: IIndicatorInfo;
  fieldList: IListData<IFieldInfo>;
  indicators: IIndicatorInfo[];
  pageData: IChildPageData;
  onChange: (param: IChildPageData) => any;
  addText?: string;
}

const ChildPage = ({ indicators, onChange, fieldList, addText = '+添加子页面', pageData, parentInfo }: Props) => {
  function handleSelectPage(pageId: string, index: number) {
    const newPageData: IChildPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.children[index].id = pageId;
    onChange(newPageData);
  }

  function handleFilterChange(info: IFilterInfo, index: number) {
    const newPageData: IChildPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.children[index].filter = info;
    onChange(newPageData);
  }

  function handleAdd() {
    const newPageData: IChildPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.children.push({
      id: null,
      key: uuidv4(),
      filter: {
        filterType: 'AND',
        filterValues:
          parentInfo.metadataCode !== '_ALL_METADATA'
            ? [
                {
                  key: 'refererCode',
                  type: 'equal',
                  value: [parentInfo.metadataCode],
                  id: uuidv4()
                }
              ]
            : []
      }
    });
    onChange(newPageData);
  }

  function handleRemove(index: number) {
    const newPageData: IChildPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.children.splice(index, 1);
    onChange(newPageData);
  }

  function handleAddReferer(index: number) {
    const newPageData: IChildPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.children[index].filter.filterValues.push({
      key: 'refererCode',
      type: 'equal',
      value: [parentInfo.metadataCode],
      id: uuidv4()
    });
    onChange(newPageData);
  }

  return (
    <div className={style.wrapper}>
      <div>
        {pageData.children.map((pageInfo, index) => (
          <div key={pageInfo.key}>
            <Row className={style.item} gutter={10}>
              <Col span={1}>
                <div className={style.center}>
                  <Tag color='gold'>{index + 1}</Tag>
                </div>
              </Col>
              <Col span={8}>
                <Select
                  value={pageInfo.id}
                  placeholder='选择子页面'
                  style={{ width: '100%' }}
                  onChange={(pageId: string) => handleSelectPage(pageId, index)}
                >
                  {indicators
                    .filter(item => item.id !== parentInfo.id)
                    .map(item => (
                      <Option
                        key={item.id}
                        value={item.id}
                        disabled={!!pageData.children.find(val => val.id === item.id)}
                      >
                        {item.customName || item.metadataName}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col span={8}>
                {!pageInfo.filter.filterValues.find(item => item.key === 'refererCode') && (
                  <Button onClick={() => handleAddReferer(index)}>关联referer</Button>
                )}
                &nbsp;
                {pageData.children.length > 1 && <Button onClick={() => handleRemove(index)}>删除</Button>}
              </Col>
            </Row>
            <div className={style.filter}>
              <Filter
                fieldList={fieldList}
                filterInfo={pageInfo.filter}
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

export default ChildPage;
