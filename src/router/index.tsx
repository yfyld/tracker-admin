import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from '@/utils';
import CoreRouter from './CoreRouter';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './PrivateRoute';
import ProgressBar from '@/components/ProgressBar';
import TeamInfo from '@/pages/team/TeamInfo';
import VerticalRouter from './VerticalRouter';
import { ROUTE_PATH } from '@/constants';

const Home = React.lazy(() => import('@/pages/home/Home'));

export default class Routes extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history}>
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
            <Route exact path={ROUTE_PATH.home} component={Home} />

            <Route path='/project' component={CoreRouter} />
            <Route path='/' component={VerticalRouter}></Route>

            <Redirect from='*' to={ROUTE_PATH.home} />
          </Switch>
        </React.Suspense>
      </ConnectedRouter>
    );
  }
}
