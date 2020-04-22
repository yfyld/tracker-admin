import { Modal, Form, Card } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { IReportAddParam } from '@/api';
import { toastformError, getAnalysePath } from '@/utils';
import { Link } from 'react-router-dom';

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
    'text-align': 'center',
    padding: 0
  };

  const linkStyle = {
    display: 'block',
    height: '100%',
    padding: 24
  };
  return (
    <Modal onOk={handleSubmit} title='新增报表' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Card>
        <Card.Grid style={gridStyle}>
          <Link style={linkStyle} to={getAnalysePath('EVENT', props.projectId)}>
            事件分析
          </Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link style={linkStyle} to={getAnalysePath('FUNNEL', props.projectId)}>
            漏斗分析
          </Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link style={linkStyle} to={getAnalysePath('PATH', props.projectId)}>
            路径分析
          </Link>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Link style={linkStyle} to={getAnalysePath('EVENT', props.projectId)}>
            用户分析
          </Link>
        </Card.Grid>
      </Card>
    </Modal>
  );
};

export default Form.create<Props>()(ReportAddModel);
