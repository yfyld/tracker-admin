import {   Button } from 'antd'
import * as React from 'react'
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import * as moment from 'moment'
interface Props{
  analyseInfo:any
}

const onChange=(dates:[moment.Moment,moment.Moment],type:string)=>{

}

const AnalyseEvent = ({analyseInfo}:Props) => {
  return (
    <div>
      <div>
        {/* <h2>{analyseInfo.name} <Icon type="edit"></Icon></h2> */}
        <Button>保存</Button>
      </div>

      <div>
          帅选
      </div>

      <div>
          <AnalyseRangePicker onChange={onChange} dates={[moment(),moment()]}></AnalyseRangePicker>
      </div>
    </div>
  )
}

export default AnalyseEvent
