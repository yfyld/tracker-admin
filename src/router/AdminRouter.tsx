import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminLayout from '@/components/AdminLayout';
import ProgressBar from '@/components/ProgressBar';
import PrivateRoute from './PrivateRoute';
import { ROUTE_PATH } from '@/constants';

const PermissionManage = React.lazy(() => import('@/pages/admin/PermissionManage'));
const RoleManage = React.lazy(() => import('@/pages/admin/RoleManage'));
const UserManage = React.lazy(() => import('@/pages/admin/UserManage'));
export default class AdminRouter extends React.Component {
  public render() {
    return (
      <AdminLayout>
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
            <PrivateRoute exact path={ROUTE_PATH.permissionManage} component={PermissionManage} />
            <PrivateRoute exact path={ROUTE_PATH.roleManage} component={RoleManage} />
            <PrivateRoute exact path={ROUTE_PATH.userManage} component={UserManage} />
            <PrivateRoute path='*' component={UserManage} />
          </Switch>
        </React.Suspense>
      </AdminLayout>
    );
  }
}
