import * as React from 'react';
import { Select, Row, Col, Icon } from 'antd';
import style from './Dimension.module.less';
const { Option, OptGroup } = Select;

const Dimension = () => {
  return (
    <div className={style.wrapper}>
      {[1].map(item => (
        <Row className={style.item}>
          <Col span={1}>
            <div className={style.center}>按</div>
          </Col>
          <Col span={3}>
            <Select>
              <OptGroup label='事件属性'>
                <Option value='1'>总次数</Option>
                <Option value='2'>用户数</Option>
                <Option value='3'>国家</Option>
                <Option value='4'>操作系统</Option>
              </OptGroup>
              <OptGroup label='用户属性'>
                <Option value='Yiminghe'>yiminghe</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={1}>
            <div className={style.center}>查看</div>
          </Col>
          <Col span={1}>
            <div className={'app-link ' + style.center}>
              <Icon type='close' />
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Dimension;
