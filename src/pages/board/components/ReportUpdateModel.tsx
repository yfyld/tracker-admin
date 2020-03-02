import { Modal, Form, Input, Select } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IReportInfo, IReportUpdateParam } from '@/api';
import { toastformError } from '@/utils';

import { IAction } from '@/types';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
const { Option } = Select;
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  orginInfo: IReportInfo;
  onSubmit: (param: IReportUpdateParam) => any;
}

const ReportUpdateModel = (props: Props) => {
  const { getFieldDecorator } = props.form;
  React.useEffect(() => {
    props.form.resetFields();
  }, [props.visible]);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({
        id: props.orginInfo.id,
        ...props.orginInfo,
        name: values.name,
        description: values.description,
        data: { ...props.orginInfo.data, ...values.time, type: values.type, timeUnit: values.timeUnit }
      });
      props.onClose(false);
    });
  };
  return (
    <Modal onOk={handleSubmit} title='快捷设置' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Form layout='horizontal' {...formItemLayout}>
        <Form.Item label='报表名称'>
          {getFieldDecorator('name', {
            initialValue: props.orginInfo.name,
            rules: [{ required: true, message: '请输入报表名称' }]
          })(<Input placeholder='请输入报表名称' />)}
        </Form.Item>
        <Form.Item label='显示方式'>
          {getFieldDecorator('type', {
            initialValue: props.orginInfo.data.type,
            rules: [{ required: true, message: '选择显示方式' }]
          })(
            <Select style={{ width: 120 }}>
              <Option value='LINE'>线图</Option>
              <Option value='BAR'>柱状图</Option>
              <Option value='PIE'>饼图</Option>
              <Option value='FUNNEL'>漏斗图</Option>
              <Option value='LIST'>列表</Option>
              <Option value='TABLE'>表格</Option>
              <Option value='TEXT'>数值</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='时间范围'>
          {getFieldDecorator('time', {
            initialValue: {
              dateStart: Number(props.orginInfo.dateStart),
              dateEnd: Number(props.orginInfo.dateEnd),
              dateType: props.orginInfo.dateType
            }
          })(<AnalyseRangePicker pickerProps={{ allowClear: false }} />)}
        </Form.Item>
        <Form.Item label='时间纬度'>
          {getFieldDecorator('timeUnit', { initialValue: props.orginInfo.data.timeUnit })(
            <Select style={{ width: 120 }}>
              <Option value='HOUR'>按小时</Option>
              <Option value='DAY'>按天</Option>
              <Option value='WEEK'>按周</Option>
              <Option value='MONTH'>按月</Option>
              <Option value='YEAR'>按年</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='报表描述'>
          {getFieldDecorator('description', { initialValue: props.orginInfo.description })(
            <Input placeholder='请输入报表描述' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(ReportUpdateModel);
