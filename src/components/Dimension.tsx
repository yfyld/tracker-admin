import * as React from 'react';
import { Select, Row, Col, Icon } from 'antd';
import style from './Dimension.module.less';
import { IFieldInfo } from '@/api';
import { IListData } from '@/types';
const { Option, OptGroup } = Select;

interface Props {
  fieldList: IListData<IFieldInfo>;
  dimension: string;
  onChange: (param: string) => any;
}

const Dimension = ({ fieldList, dimension, onChange }: Props) => {
  return (
    <div className={style.wrapper}>
      <Row className={style.item}>
        <Col span={1}>
          <div className={style.center}>按</div>
        </Col>
        <Col span={3}>
          <Select value={dimension} onChange={onChange}>
            <Option value=''>总体</Option>
            {fieldList.list.map(field => (
              <Option value={field.value} key={field.value}>
                {field.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={1}>
          <div className={style.center}>查看</div>
        </Col>
      </Row>
    </div>
  );
};

export default Dimension;
