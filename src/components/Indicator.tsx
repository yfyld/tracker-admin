import * as React from 'react'
import { Tag, Select, Row, Col, Icon } from 'antd'
import style from './Indicator.module.less'
const { Option, OptGroup } = Select

interface IndicatorItem {
  event?: string
}

interface Props {
  indicators?: IndicatorItem[]
}

const Indicator = ({ indicators }: Props) => {
  return (
    <div className={style.wrapper}>
      {[1,2,3].map(item => (
        <Row className={style.item}>
          <Col span={1}>
            <div className={style.center}>
              <Tag color="gold">1</Tag>
            </div>
          </Col>
          <Col span={3}>
            <Select >
              <Option value="jack">任意事件</Option>
              <OptGroup label="默认事件">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </OptGroup>
              <OptGroup label="行为事件">
                <Option value="Yiminghe">yiminghe</Option>
              </OptGroup>
            </Select>
          </Col>
          <Col span={1}>
            <div className={style.center}>的</div>
          </Col>
          <Col span={3}>
            <Select>
              <Option value="1">总次数</Option>
              <Option value="1">用户数</Option>
              <Option value="1">国家</Option>
              <Option value="1">操作系统</Option>
            </Select>
          </Col>
          <Col span={1}>
            <div className={'link ' + style.center}>
              <Icon type="close" />
            </div>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default Indicator
