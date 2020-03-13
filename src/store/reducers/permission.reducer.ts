import { IBasePermission, IPermissionListItem, IQueryPermission, IUpdatePermission } from '@/api';
import update from 'immutability-helper';
import { IAction, IPageData } from '@/types';
import { getType } from 'typesafe-actions';
import { doEditPermission, doGetPermission, doPostPermission, } from '@/store/actions/permission.action';
import { doResetStore } from '@/store/actions';

export interface PermissionState {
  addPermissionItem: IBasePermission,
  updatePermissionItem: IUpdatePermission,
  permissionList: IPageData<IPermissionListItem>,
  permissionListParams: IQueryPermission
}

const initialState = (): PermissionState => ({
  addPermissionItem: {
    name: '',
    description: '',
    code: '',
    status: null,
    type: null
  },
  updatePermissionItem: {
    id: null,
    name: '',
    description: '',
    code: '',
    status: null,
    type: null
  },
  permissionList: {
    totalCount: 0,
    list: []
  },
  permissionListParams: {
    page: 1,
    pageSize: 20,
    name: ''
  }
});

export const permissionReducer = (state: PermissionState = initialState(), action: IAction): PermissionState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doPostPermission.request):
      return update(state, {
        addPermissionItem: { $set: action.payload }
      });
    case getType(doPostPermission.success):
      return update(state, {
        addPermissionItem: { $set: initialState().addPermissionItem }
      });
    case getType(doGetPermission.request):
      return update(state, {
        permissionListParams: { $set: action.payload }
      });
    case getType(doGetPermission.success):
      return update(state, {
        permissionList: { $set: action.payload }
      });
    case getType(doEditPermission):
      return update(state, {
        updatePermissionItem: { $set: action.payload }
      });
    default:
      return state;
  }
};
