import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { history } from '@/utils'
import CoreRouter from './CoreRouter'
import { ConnectedRouter } from 'connected-react-router'
import PrivateRoute from './PrivateRoute';
import ProgressBar from '@/components/ProgressBar'

const Login = React.lazy(() => import('@/pages/auth/Login'))
const Signup = React.lazy(() => import('@/pages/auth/Signup'))

const ProjectList = React.lazy(() => import('@/pages/projectList/ProjectList'))



const Home = React.lazy(() => import('@/pages/home/Home'))


export default class Routes extends React.Component {
  public render() {
    return (  
        <ConnectedRouter history={history}>
          <React.Suspense
          fallback={
            <div>
              <div className="loading-wrapper">
                <ProgressBar />
              </div>
            </div>
          }
        >
          <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/project-list" component={ProjectList} />
              <Route path="/" component={CoreRouter} />
              <Redirect from="*" to="/home" />
            </Switch>
            </React.Suspense>
        </ConnectedRouter>
    )
  }
}
