import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import VerticalLayout from '@/components/VerticalLayout';
import ProgressBar from '@/components/ProgressBar';
import PrivateRoute from './PrivateRoute';
import { ROUTE_PATH } from '@/constants';
import BoardDetail from '@/pages/boardManage/BoardDetail';
const ProjectList = React.lazy(() => import('@/pages/projectList/ProjectList'));
const TeamList = React.lazy(() => import('@/pages/team/TeamList'));
const TeamInfo = React.lazy(() => import('@/pages/team/TeamInfo'));
const Login = React.lazy(() => import('@/pages/auth/Login'));
const Signup = React.lazy(() => import('@/pages/auth/Signup'));
const MyBoard = React.lazy(() => import('@/pages/boardManage/MyBoard'));
export default class VerticalRouter extends React.Component {
  public render() {
    return (
      <VerticalLayout>
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
            <Route exact path={ROUTE_PATH.login} component={Login} />
            <Route exact path={ROUTE_PATH.signup} component={Signup} />
            <PrivateRoute exact path={ROUTE_PATH.projectList} component={ProjectList} />
            <PrivateRoute exact path={ROUTE_PATH.teamList} component={TeamList} />
            <PrivateRoute exact path={ROUTE_PATH.teamInfo} component={TeamInfo} />
            <PrivateRoute exact path={ROUTE_PATH.myBoard} component={MyBoard} />
            <PrivateRoute exact path={ROUTE_PATH.boardDetail} component={BoardDetail} />
            <Redirect from='*' to={ROUTE_PATH.projectList} />
          </Switch>
        </React.Suspense>
      </VerticalLayout>
    );
  }
}
