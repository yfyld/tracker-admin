import * as React from 'react';
import style from './AppHeader.module.less';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState } from '@/types';

import { IUserPermissionCodesMap } from '@/api';
import { Menu } from 'antd';

interface Props {
  userPermissionCodes: IUserPermissionCodesMap;
  children?: React.ReactElement<any>;
  code: string;
}

const Permission = ({ children, code, userPermissionCodes, ...props }: Props) => {
  return userPermissionCodes.permissionCodesMap[code] ? React.cloneElement(children, props) : null;
};

const mapStateToProps = (state: IStoreState) => {
  const { userPermissionCodes } = state.permission;
  return {
    userPermissionCodes
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
