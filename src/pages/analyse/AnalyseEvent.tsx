import { Icon, Collapse, Divider,Select,Input } from 'antd'
import * as React from 'react'
import AnalyseRangePicker from '@/components/AnalyseRangePicker'
import moment from 'moment'
import style from './AnalyseEvent.module.less'
import ReactEcharts from 'echarts-for-react'
import Indicator from '@/components/Indicator'
import Dimension from '@/components/Dimension'
import Filter from '@/components/Filter'
const {Option} = Select;
const {Panel} = Collapse;
const {Group}=Input;
interface Props {
  analyseInfo: any
}

const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }
  ]
}

const onChange = (dates: [moment.Moment, moment.Moment], type: string) => {}

const AnalyseEvent = ({ analyseInfo }: Props) => {
  return (
    <div>
      <div className="app-title">
        <h2>
          事件分析 <Icon type="edit" />
        </h2>
        <div>
          <Icon type="save" />
        </div>
      </div>

      <Collapse defaultActiveKey={['1']}>
        <Panel header="添加分析规则" key="1">
          <div>
            <div className={style.ruleTitle}>
              <span>指标:</span>
              <span className="link">
                <Icon type="plus" />
                添加指标
              </span>
            </div>
            <Indicator/>
            <Divider />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>维度:</span>
              <span className="link">
                <Icon type="plus" />
                添加维度
              </span>
            </div>
            <Dimension />
            <Divider />
          </div>

          <div>
            <div className={style.ruleTitle}>
              <span>筛选:</span>
              <span className="link">
                <Icon type="plus" />
                添加筛选
              </span>
            </div>
            <Filter />
            <Divider />
          </div>
        </Panel>
      </Collapse>

      <div>
        <div>
          <AnalyseRangePicker
            onChange={onChange}
            dates={[moment(), moment()]}
          />|本月
        </div>
        <div>
        <Group compact>
          <Select style={{ width: '33%' }} defaultValue="Home">
            <Option value="Company">Company</Option>
          </Select>
          <Select style={{ width: '33%' }} defaultValue="Home">
            <Option value="Home">折线图</Option>
            <Option value="Company">饼图</Option>
          </Select>
          <Select style={{ width: '33%' }} defaultValue="Home">
            <Option value="Home">按天</Option>
            <Option value="Company">按月</Option>
          </Select>
        </Group>
        </div>
        <div>
          <ReactEcharts option={options} notMerge={true} lazyUpdate={true} />
        </div>
      </div>
    </div>
  )
}

export default AnalyseEvent
