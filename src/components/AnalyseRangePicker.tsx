import * as React from 'react';

import { DatePicker, Tag, Button } from 'antd';
import moment from 'moment';
import { DYNAMIC_TIME, IDynamicTime } from '@/constants';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { IDate } from '@/types';
const RangePicker = DatePicker.RangePicker;
interface Props {
  value?: IDate;
  onChange?: (param: { date: RangePickerValue; type: string }) => any;
}

//需结合Form组件使用 不能使用函数组件
class AnalyseRangePicker extends React.Component<Props> {
  handleSelectDynamicTime = (item: IDynamicTime) => {
    this.props.onChange({ date: [moment(item.startDate()), moment(item.endDate())], type: item.value });
    this.setState({ open: false });
  };
  state = {
    open: false
  };
  handleOpenChange = (open: boolean) => {
    if (open) {
      this.setState({ open });
    }
  };

  getShowDate = () => {
    if (this.props.value.type) {
      return '| ' + DYNAMIC_TIME.find(item => item.value === this.props.value.type).name;
    } else {
      return '';
    }
  };

  render() {
    return (
      <div>
        <RangePicker
          renderExtraFooter={() => (
            <div>
              <h3>动态时间:</h3>
              {DYNAMIC_TIME.map(item => (
                <Button
                  size='small'
                  key={item.value}
                  type={this.props.value.type === item.value ? 'primary' : 'default'}
                  onClick={() => this.handleSelectDynamicTime(item)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          )}
          open={this.state.open}
          format='YYYY-MM-DD'
          onOpenChange={this.handleOpenChange}
          value={this.props.value.date as RangePickerValue}
          onChange={value => {
            this.setState({ open: false });
            this.props.onChange({ date: value, type: '' });
          }}
        />
        <span>{this.getShowDate()}</span>
      </div>
    );
  }
}

export default AnalyseRangePicker;
