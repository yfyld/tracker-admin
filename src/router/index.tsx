import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { history } from '@/utils'
import CoreRouter from './CoreRouter'
import { ConnectedRouter } from 'connected-react-router'
import PrivateRoute from './PrivateRoute';
import Suspense from './Suspense';

const Login = React.lazy(() => import('@/pages/account/Login'))
const Signup = React.lazy(() => import('@/pages/account/Signup'))

const ProjectList = React.lazy(() => import('@/pages/projectList/ProjectList'))



const Home = React.lazy(() => import('@/pages/home/Home'))


export default class Routes extends React.Component {
  public render() {
    return (  
        <ConnectedRouter history={history}>
          <Switch>
              <Route exact path="/login" component={Suspense(Login)} />
              <Route exact path="/signup" component={Suspense(Signup)} />
              <Route exact path="/home" component={Suspense(Home)} />
              <PrivateRoute exact path="/project-list" component={Suspense(ProjectList)} />
              <Route path="/" component={CoreRouter} />
              <Redirect from="*" to="/home" />
            </Switch>
        </ConnectedRouter>
    )
  }
}
