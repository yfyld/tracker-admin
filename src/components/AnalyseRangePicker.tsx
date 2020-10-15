import * as React from 'react';
import style from './AnaluseRangePicker.module.less';
import { DatePicker, Tag, Button } from 'antd';
import moment from 'moment';
import { DYNAMIC_TIME, IDynamicTime } from '@/constants';
import { RangePickerValue, RangePickerProps, RangePickerPresetRange } from 'antd/lib/date-picker/interface';
import { IDate } from '@/types';
import { isArray } from 'lodash';
const RangePicker = DatePicker.RangePicker;
type Props = {
  value?: IDate;
  onChange?: (param: IDate) => any;
  defalutShowIcon?: boolean;
  pickerProps: RangePickerProps;
};

//需结合Form组件使用 不能使用函数组件
class AnalyseRangePicker extends React.Component<Props> {
  static defaultProps = {
    pickerProps: {}
  };
  state = {
    open: false,
    showIcon: this.props.defalutShowIcon,
    newValue: {} as IDate
  };

  componentDidMount() {
    this.setState({
      newValue: this.props.value.dateStart ? [moment(this.props.value.dateStart), moment(this.props.value.dateEnd)] : []
    });
  }

  handleSelectDynamicTime = (item: IDynamicTime) => {
    const newValue = { dateStart: item.startDate(), dateEnd: item.endDate(), dateType: item.value };
    this.props.onChange(newValue);
    this.setState({ open: false, newValue });
    if (!newValue.dateStart) {
      this.setState({ showIcon: true });
    }
  };

  handlePickerChange = (value: RangePickerValue) => {
    const newValue =
      value && value[0]
        ? { dateStart: value[0].valueOf(), dateEnd: value[1].valueOf(), dateType: '' }
        : { dateStart: null, dateEnd: null, dateType: '' };
    this.setState({ newValue });

    if (!newValue.dateStart) {
      this.setState({ showIcon: true });
      this.props.onChange(newValue);
    }
  };

  handlePickerOk = (value: RangePickerPresetRange) => {
    if (isArray(value)) {
      const newValue =
        value.length > 1
          ? { dateStart: value[0].valueOf(), dateEnd: value[1].valueOf(), dateType: '' }
          : { dateStart: null, dateEnd: null, dateType: '' };
      this.props.onChange(newValue);
    }

    this.setState({ open: false });
  };

  handleOpenChange = (open: boolean) => {
    if (open) {
      this.setState({ open });
    }
  };

  getShowDate = () => {
    if (this.props.value.dateType) {
      const date = DYNAMIC_TIME.find((item) => item.value === this.props.value.dateType);
      return date ? '| ' + date.name : '';
    } else {
      return '';
    }
  };

  handleShowCalendar = () => {
    this.setState({ open: true, showIcon: false });
  };

  render() {
    return this.state.showIcon ? (
      <Button icon='calendar' onClick={this.handleShowCalendar}></Button>
    ) : (
      <div className={style.picker}>
        <RangePicker
          {...this.props.pickerProps}
          renderExtraFooter={() => (
            <div>
              <h3>动态时间:</h3>
              {DYNAMIC_TIME.map((item) => (
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
          format='YYYY-MM-DD HH:mm'
          showTime
          onOpenChange={this.handleOpenChange}
          value={
            this.state.newValue.dateStart
              ? [moment(this.state.newValue.dateStart), moment(this.state.newValue.dateEnd)]
              : []
          }
          onOk={this.handlePickerOk}
          onChange={this.handlePickerChange}
        />
        <span>{this.getShowDate()}</span>
      </div>
    );
  }
}

export default AnalyseRangePicker;
