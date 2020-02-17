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
  data: Object;
  //handleAppandBoard: (params: any) => IAction;
}
const AnalyseHeader = ({ reportInfo, handleUpdateReport, handleAddReport, data }: Props) => {
  const [newReportInfo, setnewReportInfo] = React.useState(reportInfo);
  React.useEffect(() => {
    setnewReportInfo(reportInfo);
  }, [reportInfo]);

  const handleSave = () => {
    if (typeof reportInfo.id !== 'undefined') {
      handleUpdateReport({ id: null, ...newReportInfo, data });
    } else {
      handleAddReport({ ...newReportInfo, data });
    }
  };

  const handleSaveAs = () => {
    handleAddReport({ ...newReportInfo, data });
  };

  const handleAppand = () => {
    //handleAppandBoard(newReportInfo);
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>
        <Input
          type='text'
          onChange={e => setnewReportInfo({ ...newReportInfo, name: e.target.value })}
          value={newReportInfo.name}
        />
      </h2>
      <div className={style.btns}>
        <Button type='link' icon='save' onClick={handleSave}>
          保存
        </Button>
        {newReportInfo.id && (
          <Button type='link' icon='save' onClick={handleSaveAs}>
            另存为
          </Button>
        )}
        <Button type='link' icon='plus-circle' onClick={handleAppand}>
          添加到
        </Button>
      </div>
      <div className={style.description}>
        <Input
          onChange={e => setnewReportInfo({ ...newReportInfo, description: e.target.value })}
          value={newReportInfo.description}
        ></Input>
      </div>
    </div>
  );
};
const mapStateToProps = (state: IStoreState) => {
  const { reportInfo } = state.report;
  return {
    reportInfo
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseHeader);
