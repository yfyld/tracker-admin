import { Modal, Checkbox, Card } from 'antd';
import * as React from 'react';
import { IRolePermission, IUpdateRolePermissions } from '@/api';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doUpdateRolePermissions } from '@/store/actions';

interface Props {
  roleId: number;
  rolePermissions: IRolePermission[];
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

  const options = props.rolePermissions.map(item => ({
    label: item.name,
    value: parseInt(item.id),
    disabled: item.disabled,
    checked: item.checked,
    type: item.type
  }));
  const apiOptions = options.filter(option => option.type === PermissionType.API); // API类型权限
  const routerOptions = options.filter(option => option.type === PermissionType.ROUTER); // 路由类型权限
  const functionOptions = options.filter(option => option.type === PermissionType.FUNCTION); // 功能类型权限

  React.useEffect(() => {
    setApiCheckPermissionIds(apiOptions.filter(i => i.checked).map(i => i.value));
    setRouterCheckedPermissionIds(routerOptions.filter(i => i.checked).map(i => i.value));
    setFunctionCheckedPermissionIds(functionOptions.filter(i => i.checked).map(i => i.value));
  }, [props.visible, props.rolePermissions]);

  const handleSubmit = async () => {
    await props.onPutRolePermissions({
      roleId: props.roleId,
      permissionIds: apiCheckPermissionIds.concat(routerCheckedPermissionIds).concat(functionCheckedPermissionIds)
    });
    props.onClose(false);
  };

  const choosePermissions = (type: PermissionType) => (checkedValues: any) => {
    if (type === PermissionType.API) {
      setApiCheckPermissionIds(checkedValues)
    } else if (type === PermissionType.ROUTER) {
      setRouterCheckedPermissionIds(checkedValues)
    } else {
      setFunctionCheckedPermissionIds(checkedValues)
    }
  };

  return (
    <Modal onOk={handleSubmit} title='关联权限' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Card title="接口类型权限" style={{
        marginBottom: 20,
      }}>
        <Checkbox.Group options={apiOptions} value={apiCheckPermissionIds} onChange={choosePermissions(PermissionType.API)} />
      </Card>
      <Card title="路由类型权限" style={{
        marginBottom: 20,
      }}>
        <Checkbox.Group options={routerOptions} value={routerCheckedPermissionIds} onChange={choosePermissions(PermissionType.ROUTER)} />
      </Card>
      <Card title="功能类型权限">
        <Checkbox.Group options={functionOptions} value={functionCheckedPermissionIds} onChange={choosePermissions(PermissionType.FUNCTION)} />
      </Card>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { rolePermissions } = state.role;
  return {
    rolePermissions
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
