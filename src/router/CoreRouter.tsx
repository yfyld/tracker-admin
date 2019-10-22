import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from '@/components/CoreLayout';
import { Spin } from 'antd';
import ProgressBar from '@/components/ProgressBar';

const MetadataList = React.lazy(() => import('@/pages/metadata/MetadataList'));
const AnalyseEvent = React.lazy(() => import('@/pages/analyse/AnalyseEvent'));
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
            <Route path='/project/:projectId/metadata-list' component={MetadataList} />
            <Route path='/project/:projectId/analyse-event' component={AnalyseEvent} />
            <Route path='/project/:projectId/analyse-event/:reportId' component={AnalyseEvent} />
            <Route path='/project/:projectId/board/:boardId' component={Board} />
            <Route path='/project/:projectId/info' component={Project} />
            <Route path='/project/:projectId/report-list' component={ReportList} />
            <Route path='/project/:projectId/draft' component={DraftList} />
          </Switch>
        </React.Suspense>
      </CoreLayout>
    );
  }
}
