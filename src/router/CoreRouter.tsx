import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from '@/components/CoreLayout';
import { Spin } from 'antd';
import ProgressBar from '@/components/ProgressBar';
import { ROUTE_PATH } from '@/constants';

const MetadataList = React.lazy(() => import('@/pages/metadata/MetadataList'));
const Analyse = React.lazy(() => import('@/pages/analyse/Analyse'));
const Board = React.lazy(() => import('@/pages/board/Board'));
const ReportList = React.lazy(() => import('@/pages/report/ReportList'));
const Project = React.lazy(() => import('@/pages/project/Project'));
const DraftList = React.lazy(() => import('@/pages/draft/DraftList'));
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
            <Route exact path={ROUTE_PATH.analyse} component={Analyse} />
            <Route exact path={ROUTE_PATH.board} component={Board} />
            <Route exact path={ROUTE_PATH.projectInfo} component={Project} />
            <Route exact path={ROUTE_PATH.reportList} component={ReportList} />
            <Route exact path={ROUTE_PATH.draft} component={DraftList} />
            <Route exact path={ROUTE_PATH.draft} component={DraftList} />
          </Switch>
        </React.Suspense>
      </CoreLayout>
    );
  }
}
