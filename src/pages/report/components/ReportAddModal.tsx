import { Modal, Form, Input, Select, Row, Col, Card } from 'antd';
import * as React from 'react';
import { formItemLayout } from '@/constants';
import { FormComponentProps } from 'antd/lib/form';
import { IAddProject, IReportAddParam } from '@/api';
import { toastformError } from '@/utils';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddProject, doAddReport } from '@/store/actions';
interface Props extends FormComponentProps {
  visible: boolean;
  onClose: (param: boolean) => any;
  projectId: number;
  handleAddReport: (param: IReportAddParam) => IAction;
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
      props.handleAddReport({ projectId: props.projectId, status: 1, ...values });
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

const mapStateToProps = (state: IStoreState) => {
  const projectId = state.project.projectInfo.id;
  return {
    projectId
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleAddReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      }
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create<Props>()(ReportAddModel));
