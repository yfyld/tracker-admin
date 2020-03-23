import * as React from 'react';
import { Select, Row, Col, Icon, AutoComplete, Button } from 'antd';
import style from './Filter.module.less';
import { IListData } from '@/types';
import { IFieldInfo, IFilterInfo, IFilterValue } from '@/api';
import { SelectValue } from 'antd/lib/select';
const { Option, OptGroup } = Select;

interface Props {
  fieldList: IListData<IFieldInfo>;
  filterInfo: IFilterInfo;
  onChange: (filterInfo: IFilterInfo) => any;
}

const Filter = ({ fieldList, filterInfo, onChange }: Props) => {
  const [recommend, setrecommend] = React.useState<string[]>([]);
  const handleFieldChange = (value: string, index: number) => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterValues[index].key = value;
    newFilterInfo.filterValues[index].type = 'equal';
    newFilterInfo.filterValues[index].value = [];
    const field = fieldList.list.find(field => field.value === value);
    if (field) {
      setrecommend(field.recommend);
    }

    onChange(newFilterInfo);
  };

  const handleFilterTypeChange = (value: string, index: number) => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterValues[index].type = value;
    if (value === 'equal' || value === 'notEqual') {
      newFilterInfo.filterValues[index].value = [];
    } else if (value === 'between') {
      newFilterInfo.filterValues[index].value = [null, null];
    } else {
      newFilterInfo.filterValues[index].value = null;
    }
    onChange(newFilterInfo);
  };

  const handleFilterValueChange = (value: string, index: number) => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterValues[index].value = value;
    onChange(newFilterInfo);
  };

  const handleClose = (index: number) => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterValues.splice(index, 1);
    onChange(newFilterInfo);
  };

  const handleAdd = () => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterValues.push({
      type: null,
      key: null,
      value: null,
      id: Date.now()
    });
    onChange(newFilterInfo);
  };

  const handleChangeFilterType = () => {
    const newFilterInfo: IFilterInfo = JSON.parse(JSON.stringify(filterInfo));
    newFilterInfo.filterType = newFilterInfo.filterType === 'AND' ? 'OR' : 'AND';
    onChange(newFilterInfo);
  };

  return (
    <div>
      {filterInfo.filterValues.length > 0 && (
        <div className={style.wrapper}>
          {filterInfo.filterValues.length > 1 && (
            <div className={style.type}>
              <Button size='small' onClick={handleChangeFilterType}>
                {filterInfo.filterType === 'AND' ? '且' : '或'}
              </Button>
              <div className={style.line}></div>
            </div>
          )}
          <div className={style.form}>
            {filterInfo.filterValues.map((filter, index) => (
              <Row gutter={16} key={filter.id}>
                <Col span={3}>
                  <Select value={filter.key} onChange={(val: string) => handleFieldChange(val, index)}>
                    {fieldList.list.map(field => (
                      <Option value={field.value} key={field.value}>
                        {field.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={3}>
                  <Select value={filter.type} onChange={(val: string) => handleFilterTypeChange(val, index)}>
                    <Option value='equal'>等于</Option>
                    <Option value='notEqual'>不等于</Option>
                    <Option value='isSet'>有值</Option>
                    <Option value='notSet'>没值</Option>

                    <Option value='greater'>大于</Option>
                    <Option value='less'>小于</Option>
                    <Option value='between'>区间</Option>

                    <Option value='contain'>包含</Option>
                    <Option value='notContain'>不包含</Option>
                    <Option value='isEmpty'>为空</Option>
                    <Option value='isNotEmpty'>不为空</Option>
                    <Option value='rlike'>正则匹配</Option>
                    <Option value='notrlike'>正则不匹配</Option>
                  </Select>
                </Col>
                {filter.type !== 'isEmpty' &&
                  filter.type !== 'isNotEmpty' &&
                  filter.type !== 'isSet' &&
                  filter.type !== 'notSet' &&
                  filter.type !== 'rlike' &&
                  filter.type !== 'notrlike' && (
                    <Col span={8}>
                      {filter.type === 'equal' || filter.type === 'notEqual' ? (
                        <Select
                          value={filter.value}
                          onChange={(val: string) => handleFilterValueChange(val, index)}
                          mode='tags'
                          style={{ width: '100%' }}
                          tokenSeparators={[',']}
                        >
                          {recommend.map(item => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        <AutoComplete
                          value={filter.value}
                          dataSource={recommend}
                          style={{ width: '100%' }}
                          onChange={(val: any) => handleFilterValueChange(val, index)}
                        />
                      )}
                    </Col>
                  )}
                <Col span={1}>
                  <div onClick={() => handleClose(index)} className={'app-link ' + style.close}>
                    <Icon type='minus-circle' />
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      )}
      <a onClick={handleAdd} className={style.add}>
        <Icon type='plus-square' />
        添加筛选
      </a>
    </div>
  );
};

export default Filter;
