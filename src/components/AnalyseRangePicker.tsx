import * as React from 'react'

import {  DatePicker, Tag } from 'antd'
import * as moment from 'moment'
const RangePicker = DatePicker.RangePicker
interface Props {
  dates:[moment.Moment,moment.Moment],
  onChange:(dates:[moment.Moment,moment.Moment],type:string)=>void
}

const AnalyseRangePicker = ({
  dates,
  onChange
}: Props) => {

  return (
    <RangePicker
          renderExtraFooter={()=><div>
            <h3>动态时间:</h3>
            <Tag>当天</Tag>
            <Tag>当月</Tag>
            <Tag>上个月</Tag>
            <Tag>一周 </Tag>
          </div>}
          
          format="YYYY-MM-DD"
          value={dates}
          onChange={()=>{onChange(dates,"2")}}
        />
  )
}

export default AnalyseRangePicker
