import { Form, Input, Modal, Radio } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IReportUpdateParam, IReportInfo, IReportAddParam, IReportAppendToBoard } from '@/api';
import { toastformError } from '@/utils';
import { formItemLayout } from '@/constants';
import moment from 'moment';
import AnalyseRangePicker from './AnalyseRangePicker';
const { TextArea } = Input;
interface Props extends FormComponentProps {
  visible: boolean;
  onSubmit: (param: IReportAppendToBoard) => any;
  onClose: (param: boolean) => any;
  reportInfo: IReportInfo;
  boardIds: number[];
}

const BoardAppendReportModal = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      props.onSubmit({
        projectId: props.reportInfo.projectId,
        boardIds: props.boardIds,
        reportId: props.reportInfo.id
      });
      props.onClose(false);
    });
  };
  return (
    <Modal title='添加到看板' visible={props.visible} onOk={handleSubmit} onCancel={() => props.onClose(false)}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label='名称'>
          {getFieldDecorator('name', {
            initialValue: props.reportInfo.name
          })(<Input placeholder='名称' />)}
        </Form.Item>
        <Form.Item label='时间范围'>{getFieldDecorator('rangeTime', {})(<AnalyseRangePicker />)}</Form.Item>
        <Form.Item label='展现方式'>
          {getFieldDecorator('type', {
            initialValue: props.reportInfo.type
          })(
            <Radio.Group size='large'>
              <Radio.Button value='a'>折线图</Radio.Button>
              <Radio.Button value='b'>饼图</Radio.Button>
              <Radio.Button value='c'>柱状图</Radio.Button>
              <Radio.Button value='d'>表格</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='副标题'>
          {getFieldDecorator('description', {
            initialValue: props.reportInfo.description
          })(<TextArea placeholder='description' />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(BoardAppendReportModal);
