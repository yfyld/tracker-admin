import * as React from 'react'
import { Switch,Route } from 'react-router-dom'
import CoreLayout from '@/components/CoreLayout';

const EventList = React.lazy(() => import('@/pages/event/EventList'))

const Home = React.lazy(() => import('@/pages/home/Home'))
const AnalyseEvent = React.lazy(() => import('@/pages/analyse/AnalyseEvent'))

export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <Switch>
            <Route  path="/project/:projectId/event-analyse" component={Home} />
            <Route  path="/project/:projectId/event-list" component={EventList} />
            <Route  path="/project/:projectId/analyse-event" component={AnalyseEvent} />
            <Route  path="event" component={Home} />
            <Route  path="board" component={Home} />
            <Route  path="filter" component={Home} />
            
          </Switch>
      </CoreLayout>
    )
  }
}
