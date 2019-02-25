import * as React from 'react'
import { Switch, Redirect,Route } from 'react-router-dom'
import CoreLayout from '@/components/CoreLayout';


const Home = React.lazy(() => import('@/pages/home/Home'))


export default class Routes extends React.Component {
  public render() {
    return (
      <CoreLayout>
        <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect from="*" to="/home" />
          </Switch>
      </CoreLayout>
    )
  }
}
