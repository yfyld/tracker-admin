import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import CoreLayout from '@/components/CoreLayout'
import { Spin } from 'antd'

const MetadataList = React.lazy(() => import('@/pages/metadata/MetadataList'))

const Home = React.lazy(() => import('@/pages/home/Home'))
const AnalyseEvent = React.lazy(() => import('@/pages/analyse/AnalyseEvent'))
const Board = React.lazy(() => import('@/pages/board/Board'))
const Project = React.lazy(() => import('@/pages/project/Project'))
export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <React.Suspense
          fallback={
            <div className="loading-wrapper">
              <Spin tip="loading" />
            </div>
          }
        >
          <Switch>
            <Route
              path="/project/:projectId/metadata-list"
              component={MetadataList}
            />
            <Route
              path="/project/:projectId/analyse-event"
              component={AnalyseEvent}
            />
            <Route
              path="/project/:projectId/board/:boardId"
              component={Board}
            />
            <Route
              path="/project/:projectId/info"
              component={Project}
            />
            <Route path="event" component={Home} />
            <Route path="board" component={Home} />
            <Route path="filter" component={Home} />
          </Switch>
        </React.Suspense>
      </CoreLayout>
    )
  }
}
