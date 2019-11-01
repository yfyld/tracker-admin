import { Form, Input, Modal, Radio } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IReportUpdateParam, IReportInfo, IReportAddParam } from '@/api';
import { toastformError } from '@/utils';
import { formItemLayout } from '@/constants';
import moment from 'moment';
import AnalyseRangePicker from './AnalyseRangePicker';
const { TextArea } = Input;
interface Props extends FormComponentProps {
  visible: boolean;
  onSubmit: (param: IReportAddParam) => any;
  onClose: (param: boolean) => any;
  defaultValue: IReportInfo;
}

const BoardAppendReportModal = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({ ...props.defaultValue, ...values });
      props.onClose(false);
    });
  };
  return (
    <Modal title='添加到看板' visible={props.visible} onOk={handleSubmit} onCancel={() => props.onClose(false)}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label='名称'>
          {getFieldDecorator('name', {
            initialValue: props.defaultValue.name
          })(<Input placeholder='名称' />)}
        </Form.Item>
        <Form.Item label='时间范围'>{getFieldDecorator('rangeTime', {})(<AnalyseRangePicker />)}</Form.Item>
        <Form.Item label='展现方式'>
          {getFieldDecorator('type', {
            initialValue: props.defaultValue.type
          })(
            <Radio.Group size='large'>
              <Radio.Button value='a'>折线图</Radio.Button>
              <Radio.Button value='b'>饼图</Radio.Button>
              <Radio.Button value='c'>柱状图</Radio.Button>
              <Radio.Button value='d'>表格</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='描述'>
          {getFieldDecorator('description', {
            initialValue: props.defaultValue.description
          })(<TextArea placeholder='description' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(BoardAppendReportModal);
