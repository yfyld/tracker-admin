import React from 'react';

import { IReportInfo } from '@/api';
import { connect } from 'react-redux';

import { IStoreState } from '@/types';
import AnalyseEvent from './AnalyseEvent';

interface Props {
  reportInfo: IReportInfo;
}

const Analyse = ({ reportInfo }: Props) => {
  switch (reportInfo.type) {
    case 'EVENT':
      return <AnalyseEvent></AnalyseEvent>;
    default:
      return <div></div>;
  }
};

const mapStateToProps = (state: IStoreState) => {
  const { reportInfo } = state.report;
  return {
    reportInfo
  };
};

export default connect(mapStateToProps, null)(Analyse);
