import React from 'react';
import { Icon, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport } from '@/store/actions';
import { IReportAddParam, IReportUpdateParam, IReportInfo } from '@/api';
import style from './AnalyseHeader.module.less';
interface Props {
  reportInfo: IReportInfo;
  handleAddReport: (params: IReportAddParam) => IAction;
  handleUpdateReport: (params: IReportUpdateParam) => IAction;
  //handleAppandBoard: (params: any) => IAction;
}
const AnalyseHeader = ({ reportInfo, handleUpdateReport, handleAddReport }: Props) => {
  const handleSave = () => {
    if (typeof reportInfo.id !== 'undefined') {
      handleUpdateReport({ id: null, ...reportInfo });
    } else {
      handleAddReport(reportInfo);
    }
  };

  const handleSaveAs = () => {
    handleAddReport(reportInfo);
  };

  const handleAppand = () => {
    //handleAppandBoard(reportInfo);
  };
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>
        <Input type='text' defaultValue={reportInfo.name} />
      </h2>
      <div className={style.btns}>
        <Button type='link' icon='save' onClick={handleSave}>
          保存
        </Button>
        {reportInfo.id && (
          <Button type='link' icon='save' onClick={handleSaveAs}>
            另存为
          </Button>
        )}
        <Button type='link' icon='plus-circle' onClick={handleAppand}>
          添加到
        </Button>
      </div>
      <div className={style.description}>
        <Input defaultValue={reportInfo.description}></Input>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleAddReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      },
      handleUpdateReport: (params: IReportUpdateParam) => {
        return doUpdateReport.request(params);
      }
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(AnalyseHeader);
