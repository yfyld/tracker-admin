import * as React from 'react';
import { Select, Row, Col, Icon, Input, Switch } from 'antd';
import style from './Filter.module.less';
const { Option, OptGroup } = Select;

const Filter = () => {
  return (
    <div className={style.wrapper}>
      <Row gutter={16} className={style.item}>
        <Col span={1}>
          <Switch checkedChildren='且' unCheckedChildren='或' defaultChecked />
        </Col>
        <Col span={3}>
          <Select>
            <OptGroup label='事件属性'>
              <Option key='1' value='1'>
                总次数
              </Option>
              <Option key='2' value='2'>
                用户数
              </Option>
              <Option key='3' value='3'>
                国家
              </Option>
              <Option key='4' value='4'>
                操作系统
              </Option>
            </OptGroup>
            <OptGroup label='自定义属性'></OptGroup>
            {/* <OptGroup label='用户属性'>
              <Option key='5' value='Yiminghe'>
                yiminghe
              </Option>
            </OptGroup> */}
          </Select>
        </Col>
        <Col span={3}>
          <Select>
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
        <Col span={8}>
          <Select mode='tags' style={{ width: '100%' }} tokenSeparators={[',']}>
            <Option value='aaa'>aaa</Option>
          </Select>
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

export default Filter;
