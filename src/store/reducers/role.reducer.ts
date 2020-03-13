import { IBaseRole, IRoleListItem, IQueryRole, IUpdateRole, IRolePermission } from '@/api';
import update from 'immutability-helper';
import { IAction, IPageData } from '@/types';
import { getType } from 'typesafe-actions';
import { doEditRole, doGetRole, doGetRolePermissions, doPostRole, } from '@/store/actions/role.action';
import { doResetStore } from '@/store/actions';

export interface RoleState {
  addRoleItem: IBaseRole,
  updateRoleItem: IUpdateRole,
  roleList: IPageData<IRoleListItem>,
  roleListParams: IQueryRole,
  rolePermissions :IRolePermission[]
}

const initialState = (): RoleState => ({
  addRoleItem: {
    name: '',
    description: '',
    code: '',
    status: null,
    type: null
  },
  updateRoleItem: {
    id: null,
    name: '',
    description: '',
    code: '',
    status: null,
    type: null
  },
  roleList: {
    totalCount: 0,
    list: []
  },
  roleListParams: {
    page: 1,
    pageSize: 20,
    name: ''
  },
  rolePermissions: []
});

export const roleReducer = (state: RoleState = initialState(), action: IAction): RoleState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doPostRole.request):
      return update(state, {
        addRoleItem: { $set: action.payload }
      });
    case getType(doPostRole.success):
      return update(state, {
        addRoleItem: { $set: initialState().addRoleItem }
      });
    case getType(doGetRole.request):
      return update(state, {
        roleListParams: { $set: action.payload }
      });
    case getType(doGetRole.success):
      return update(state, {
        roleList: { $set: action.payload }
      });
    case getType(doEditRole):
      return update(state, {
        updateRoleItem: { $set: action.payload }
      });
    case getType(doGetRolePermissions.success):
      return update(state, {
        rolePermissions: { $set: action.payload }
      });
    default:
      return state;
  }
};
