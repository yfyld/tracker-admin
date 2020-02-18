import * as React from 'react';

import { DatePicker, Tag, Button } from 'antd';
import moment from 'moment';
import { DYNAMIC_TIME, IDynamicTime } from '@/constants';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { IDate } from '@/types';
const RangePicker = DatePicker.RangePicker;
interface Props {
  value: IDate;
  onChange?: (param: IDate) => any;
}

//需结合Form组件使用 不能使用函数组件
class AnalyseRangePicker extends React.Component<Props> {
  handleSelectDynamicTime = (item: IDynamicTime) => {
    this.props.onChange({ dateStart: item.startDate(), dateEnd: item.endDate(), dateType: item.value });
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
    if (this.props.value.dateType) {
      return '| ' + DYNAMIC_TIME.find(item => item.value === this.props.value.dateType).name;
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
                  type={this.props.value.dateType === item.value ? 'primary' : 'default'}
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
          value={[moment(this.props.value.dateStart), moment(this.props.value.dateEnd)]}
          onChange={value => {
            this.setState({ open: false });
            this.props.onChange({ dateStart: value[0].valueOf(), dateEnd: value[1].valueOf(), dateType: '' });
          }}
        />
        <span>{this.getShowDate()}</span>
      </div>
    );
  }
}

export default AnalyseRangePicker;
