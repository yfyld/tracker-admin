import { Modal, Form, Card } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IReportAddParam } from '@/api';
import { toastformError } from '@/utils';

interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  projectId: number;
}

const ReportAddModel = (props: Props) => {
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
      props.onClose(false);
    });
  };
  const gridStyle = {
    width: '25%',
    'text-align': 'center'
  };
  return (
    <Modal onOk={handleSubmit} title='新增报表' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Card>
        <Card.Grid style={gridStyle}>事件分析</Card.Grid>
        <Card.Grid style={gridStyle}>漏斗分析</Card.Grid>
        <Card.Grid style={gridStyle}>路径分析</Card.Grid>
        <Card.Grid style={gridStyle}>用户分析</Card.Grid>
      </Card>
    </Modal>
  );
};

export default Form.create<Props>()(ReportAddModel);
