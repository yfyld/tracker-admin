import { Modal, Checkbox } from 'antd';
import * as React from 'react';
import { IUpdateRolePermissions, IPermissionList, IRoleInfo } from '@/api';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doUpdateRolePermissions } from '@/store/actions';

interface Props {
  roleId: number;
  allPermissionList: IPermissionList;
  roleInfo: IRoleInfo;
  visible: boolean;
  onClose: (param: boolean) => any;
  onPutRolePermissions: (param: IUpdateRolePermissions) => IAction;
}

enum PermissionType {
  API = 1,
  ROUTER,
  FUNCTION
}
const RoleLinkPermissionsModal = (props: Props) => {
  const [apiCheckPermissionIds, setApiCheckPermissionIds] = React.useState(null);
  const [routerCheckedPermissionIds, setRouterCheckedPermissionIds] = React.useState(null);
  const [functionCheckedPermissionIds, setFunctionCheckedPermissionIds] = React.useState(null);

  const options = props.allPermissionList.list.map((item) => ({
    label: item.name,
    value: item.id,
    disabled: !item.status,
    // checked: item.checked,
    type: item.type
  }));
  const apiOptions = options.filter((option) => option.type === PermissionType.API); // API类型权限
  const routerOptions = options.filter((option) => option.type === PermissionType.ROUTER); // 路由类型权限
  const functionOptions = options.filter((option) => option.type === PermissionType.FUNCTION); // 功能类型权限

  React.useEffect(() => {
    setApiCheckPermissionIds(props.roleInfo.permissions.filter((i) => i.type === PermissionType.API).map((i) => i.id));
    setRouterCheckedPermissionIds(
      props.roleInfo.permissions.filter((i) => i.type === PermissionType.ROUTER).map((i) => i.id)
    );
    setFunctionCheckedPermissionIds(
      props.roleInfo.permissions.filter((i) => i.type === PermissionType.FUNCTION).map((i) => i.id)
    );
  }, [props.roleInfo, props.allPermissionList]);

  const handleSubmit = async () => {
    await props.onPutRolePermissions({
      roleId: props.roleId,
      permissionIds: apiCheckPermissionIds.concat(routerCheckedPermissionIds).concat(functionCheckedPermissionIds)
    });
    props.onClose(false);
  };

  const choosePermissions = (type: PermissionType) => (checkedValues: any) => {
    if (type === PermissionType.API) {
      setApiCheckPermissionIds(checkedValues);
    } else if (type === PermissionType.ROUTER) {
      setRouterCheckedPermissionIds(checkedValues);
    } else {
      setFunctionCheckedPermissionIds(checkedValues);
    }
  };

  return (
    <Modal onOk={handleSubmit} title='关联权限' visible={props.visible} onCancel={() => props.onClose(false)}>
      <h4>接口类型权限</h4>
      <Checkbox.Group
        options={apiOptions}
        value={apiCheckPermissionIds}
        onChange={choosePermissions(PermissionType.API)}
      />

      <h4>路由类型权限</h4>
      <Checkbox.Group
        options={routerOptions}
        value={routerCheckedPermissionIds}
        onChange={choosePermissions(PermissionType.ROUTER)}
      />
      <h4>功能类型权限</h4>
      <Checkbox.Group
        options={functionOptions}
        value={functionCheckedPermissionIds}
        onChange={choosePermissions(PermissionType.FUNCTION)}
      />
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { allPermissionList } = state.permission;
  const { roleInfo } = state.role;
  return {
    allPermissionList,
    roleInfo
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onPutRolePermissions: (params: IUpdateRolePermissions) => {
        return doUpdateRolePermissions.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoleLinkPermissionsModal);
