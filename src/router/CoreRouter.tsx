import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from '@/components/CoreLayout';
import { Spin } from 'antd';
import ProgressBar from '@/components/ProgressBar';
import { ROUTE_PATH } from '@/constants';

const MetadataList = React.lazy(() => import('@/pages/metadata/MetadataList'));
const AnalyseEvent = React.lazy(() => import('@/pages/analyse/AnalyseEvent'));
const AnalyseFunnel = React.lazy(() => import('@/pages/analyse/AnalyseFunnel'));
const AnalysePath = React.lazy(() => import('@/pages/analyse/AnalysePath'));

const Board = React.lazy(() => import('@/pages/board/Board'));
const BoardList = React.lazy(() => import('@/pages/board/BoardList'));
const ReportList = React.lazy(() => import('@/pages/report/ReportList'));
const Project = React.lazy(() => import('@/pages/project/Project'));
const DraftList = React.lazy(() => import('@/pages/draft/DraftList'));
const CustomQuery = React.lazy(() => import('@/pages/custom/CustomQuery'));
const UserTimeline = React.lazy(() => import('@/pages/userTimeline/UserTimeline'));
export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <React.Suspense
          fallback={
            <div>
              <div className='loading-wrapper'>
                <ProgressBar />
              </div>
            </div>
          }
        >
          <Switch>
            <Route exact path={ROUTE_PATH.metadataList} component={MetadataList} />
            <Route exact path={ROUTE_PATH.analyseEvent} component={AnalyseEvent} />
            <Route exact path={ROUTE_PATH.analyseFunnel} component={AnalyseFunnel} />
            <Route exact path={ROUTE_PATH.analysePath} component={AnalysePath} />
            <Route exact path={ROUTE_PATH.custom} component={CustomQuery} />
            <Route exact path={ROUTE_PATH.userTimeline} component={UserTimeline} />

            <Route exact path={ROUTE_PATH.board} component={Board} />
            <Route exact path={ROUTE_PATH.projectInfo} component={Project} />
            <Route exact path={ROUTE_PATH.reportList} component={ReportList} />
            <Route exact path={ROUTE_PATH.draft} component={DraftList} />
            <Route exact path={ROUTE_PATH.draft} component={DraftList} />

            <Route exact path={ROUTE_PATH.boardList} component={BoardList} />
          </Switch>
        </React.Suspense>
      </CoreLayout>
    );
  }
}
