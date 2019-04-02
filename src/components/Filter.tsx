import * as React from 'react'
import { Select, Row, Col, Icon, Input } from 'antd'
import style from './Filter.module.less'
const { Option, OptGroup } = Select

const Filter = () => {
  return (
    <div className={style.wrapper}>
      <Row>
        <Col span={2}>
          <div className={style.center}>或</div>
        </Col>
        <Col span={22}>
          <Row gutter={16}>
            <Col span={3}>
              <Select>
                <OptGroup label="事件属性">
                  <Option value="1">总次数</Option>
                  <Option value="1">用户数</Option>
                  <Option value="1">国家</Option>
                  <Option value="1">操作系统</Option>
                </OptGroup>
                <OptGroup label="用户属性">
                  <Option value="Yiminghe">yiminghe</Option>
                </OptGroup>
              </Select>
            </Col>
            <Col span={3}>
              <Select>
                <Option value="1">等于</Option>
                <Option value="1">不等于</Option>
                <Option value="1">有值</Option>
                <Option value="1">没值</Option>

                <Option value="1">大于</Option>
                <Option value="1">小于</Option>
                <Option value="1">区间</Option>

                <Option value="1">包含</Option>
                <Option value="1">不包含</Option>
                <Option value="1">为空</Option>
                <Option value="1">不为空</Option>
                <Option value="1">正则匹配</Option>
                <Option value="1">正则不匹配</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Input />
            </Col>
            <Col span={1}>
              <div className={'link ' + style.center}>
                <Icon type="close" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Filter
