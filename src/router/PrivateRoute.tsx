import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { localStore, getCookie } from '@/utils';
import config from '@/config/config';

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      getCookie('TELESCOPE_LOGIN') === 'true' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={
            config.signonAble
              ? {
                  pathname: '/login',
                  state: { from: props.location }
                }
              : config.singelLoginURL
          }
        />
      )
    }
  />
);

export default PrivateRoute;
