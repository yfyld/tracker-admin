import * as React from 'react';

import { DatePicker, Tag } from 'antd';
import * as moment from 'moment';
const RangePicker = DatePicker.RangePicker;
interface Props {
  value?: [moment.Moment, moment.Moment];
  onChange?: (value: [moment.Moment, moment.Moment], type: string) => void;
}

//需结合Form组件使用 不能使用函数组件
class AnalyseRangePicker extends React.Component<Props> {
  render() {
    return (
      <RangePicker
        renderExtraFooter={() => (
          <div>
            <h3>动态时间:</h3>
            <Tag>当天</Tag>
            <Tag>当月</Tag>
            <Tag>上个月</Tag>
            <Tag>一周 </Tag>
          </div>
        )}
        format='YYYY-MM-DD'
        value={this.props.value}
        onChange={() => {
          this.props.onChange(this.props.value, '2');
        }}
      />
    );
  }
}

// const AnalyseRangePicker = ({ value, onChange }: Props) => {
//   return (
//     <RangePicker
//       renderExtraFooter={() => (
//         <div>
//           <h3>动态时间:</h3>
//           <Tag>当天</Tag>
//           <Tag>当月</Tag>
//           <Tag>上个月</Tag>
//           <Tag>一周 </Tag>
//         </div>
//       )}
//       format='YYYY-MM-DD'
//       value={value}
//       onChange={() => {
//         onChange(value, '2');
//       }}
//     />
//   );
// };

export default AnalyseRangePicker;
