import React from 'react';
import { Icon, Button, Input, message, Select, Popover } from 'antd';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddReport, doUpdateReport, doAppendReportToBoard } from '@/store/actions';
import { IReportAddParam, IReportUpdateParam, IReportInfo, IReportAppendToBoard } from '@/api';
import style from './AnalyseHeader.module.less';
import ReportAppendBoard from '@/components/ReportAppendBoard';
interface Props {
  reportInfo: IReportInfo;
  onAddReport: (params: IReportAddParam) => IAction;
  onUpdateReport: (params: IReportUpdateParam) => IAction;
  data: Object;
}
const AnalyseHeader = ({ reportInfo, onUpdateReport, onAddReport, data }: Props) => {
  const [newReportInfo, setnewReportInfo] = React.useState(reportInfo);
  const [appendedBoardIds, setappendedBoardIds] = React.useState([]);
  React.useEffect(() => {
    setnewReportInfo(reportInfo);
  }, [reportInfo]);

  const handleSave = () => {
    if (typeof reportInfo.id !== 'undefined') {
      onUpdateReport({ id: null, ...newReportInfo, data });
    } else {
      onAddReport({ ...newReportInfo, data });
    }
  };

  const handleSaveAs = () => {
    const { id, ...newInfo } = newReportInfo;
    onAddReport({ ...newInfo, data });
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>
        <Input
          type='text'
          onChange={(e) => setnewReportInfo({ ...newReportInfo, name: e.target.value })}
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

        {newReportInfo.id && (
          <ReportAppendBoard reportInfo={newReportInfo}>
            <Button type='link' icon='plus-circle'>
              添加到
            </Button>
          </ReportAppendBoard>
        )}
      </div>
      <div className={style.description}>
        <Input
          onChange={(e) => setnewReportInfo({ ...newReportInfo, description: e.target.value })}
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
      onAddReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      },
      onUpdateReport: (params: IReportUpdateParam) => {
        return doUpdateReport.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AnalyseHeader);
