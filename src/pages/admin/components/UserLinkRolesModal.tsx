import { Modal, Checkbox, Card } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doPutUserRoles } from '@/store/actions';
import { IUpdateUserRoles, IUserRole } from '@/api';

interface Props {
  userId: number;
  userRoles: IUserRole[];
  visible: boolean;
  onClose: (param: boolean) => any;
  onPutUserRoles: (param: IUpdateUserRoles) => IAction;
}

enum RoleType {
  GLOBAL_ADMIN = 1,
  PROJECT_ADMIN,
  USER
}
const UserLinkRolesModal = (props: Props) => {
  const [globalAdminCheckPermissionIds, seGlobalAdminCheckPermissionIds] = React.useState(null);
  const [projectAdminCheckedPermissionIds, setProjectAdminCheckedPermissionIds] = React.useState(null);
  const [userCheckedPermissionIds, setUserCheckedPermissionIds] = React.useState(null);

  const options = props.userRoles.map((item) => ({
    label: item.name,
    value: parseInt(item.id),
    disabled: item.disabled,
    checked: item.checked,
    type: item.type
  }));
  const globalAdminOptions = options.filter((option) => option.type === RoleType.GLOBAL_ADMIN); // 超管类型角色
  const projectAdminOptions = options.filter((option) => option.type === RoleType.PROJECT_ADMIN); // 应用管理员类型角色
  const userOptions = options.filter((option) => option.type === RoleType.USER); // 普通用户类型角色

  React.useEffect(() => {
    seGlobalAdminCheckPermissionIds(globalAdminOptions.filter((i) => i.checked).map((i) => i.value));
    setProjectAdminCheckedPermissionIds(projectAdminOptions.filter((i) => i.checked).map((i) => i.value));
    setUserCheckedPermissionIds(userOptions.filter((i) => i.checked).map((i) => i.value));
  }, [props.visible, props.userRoles]);

  const handleSubmit = async () => {
    await props.onPutUserRoles({
      userId: props.userId,
      roleIds: globalAdminCheckPermissionIds.concat(projectAdminCheckedPermissionIds).concat(userCheckedPermissionIds)
    });
    props.onClose(false);
  };

  const choosePermissions = (type: RoleType) => (checkedValues: any) => {
    if (type === RoleType.GLOBAL_ADMIN) {
      seGlobalAdminCheckPermissionIds(checkedValues);
    } else if (type === RoleType.PROJECT_ADMIN) {
      setProjectAdminCheckedPermissionIds(checkedValues);
    } else {
      setUserCheckedPermissionIds(checkedValues);
    }
  };

  return (
    <Modal onOk={handleSubmit} title='关联角色' visible={props.visible} onCancel={() => props.onClose(false)}>
      <Card
        title='超管类型角色'
        style={{
          marginBottom: 20
        }}
      >
        <Checkbox.Group
          options={globalAdminOptions}
          value={globalAdminCheckPermissionIds}
          onChange={choosePermissions(RoleType.GLOBAL_ADMIN)}
        />
      </Card>
      <Card
        title='应用管理员类型角色'
        style={{
          marginBottom: 20
        }}
      >
        <Checkbox.Group
          options={projectAdminOptions}
          value={projectAdminCheckedPermissionIds}
          onChange={choosePermissions(RoleType.PROJECT_ADMIN)}
        />
      </Card>
      <Card title='普通用户类型角色'>
        <Checkbox.Group
          options={userOptions}
          value={userCheckedPermissionIds}
          onChange={choosePermissions(RoleType.USER)}
        />
      </Card>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { userRoles } = state.app;
  return {
    userRoles
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onPutUserRoles: (params: IUpdateUserRoles) => {
        return doPutUserRoles.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserLinkRolesModal);
