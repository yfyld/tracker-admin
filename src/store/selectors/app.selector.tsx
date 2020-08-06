import { createSelector } from 'reselect';
import { IStoreState } from '@/types';
import { ADD_BROAD, PERMISSION_CODE } from '@/constants';

const projectIdSelector = (state: IStoreState) => state.project.projectInfo.id;
const boardListSelector = (state: IStoreState) => state.board.boardList.list;
const userPermissionCodesMapSelector = (state: IStoreState) => state.permission.userPermissionCodes.permissionCodesMap;

export const menuDataSelector = createSelector(
  projectIdSelector,
  boardListSelector,
  userPermissionCodesMapSelector,
  (id, boardList, userPermissionCodesMap) => {
    const routerData = [
      {
        key: `/project/info?projectId=${id}`,
        name: '应用信息',
        icon: 'appstore',
        auth: PERMISSION_CODE.PROJECT_INFO
      },
      {
        key: 'broad',
        name: '数据看板',
        icon: 'dashboard',
        action: ADD_BROAD,
        children: boardList.map((item) => ({
          key: `/project/board?projectId=${id}&boardId=${item.id}`,
          icon: 'file',
          name: item.name,
          auth: PERMISSION_CODE.ROUTE_BOARD_LIST
        }))
      },
      {
        key: 'analyse',
        name: '行为分析',

        auth: PERMISSION_CODE.ROUTE_ANALYSE,
        icon: 'gold',
        children: [
          {
            key: `/project/analyse/event?projectId=${id}`,
            icon: 'fund',
            name: '事件分析',
            auth: PERMISSION_CODE.ROUTE_ANALYSE_EVENT
          },
          {
            key: `/project/analyse/funnel?projectId=${id}`,
            icon: 'filter',
            name: '漏斗分析',
            auth: PERMISSION_CODE.ROUTE_ANALYSE_FUNNEL
          },
          {
            key: `/project/analyse/path?projectId=${id}`,
            icon: 'fork',
            name: '路径分析',
            auth: PERMISSION_CODE.ROUTE_ANALYSE_PATH
          }
        ]
      },
      {
        key: `/project/report-list?projectId=${id}`,
        name: '报表',
        icon: 'line-chart',

        auth: PERMISSION_CODE.ROUTE_REPORT
      },
      {
        key: `/project/metadata-list?projectId=${id}`,
        name: '元数据',
        icon: 'database',

        auth: PERMISSION_CODE.ROUTE_METADATA
      },
      {
        key: `/project/query?projectId=${id}`,
        name: '自定义查询',
        icon: 'search',

        auth: PERMISSION_CODE.ROUTE_QUERY
      },
      {
        key: `/project/user-timeline?projectId=${id}`,
        name: '用户时间轴',
        icon: 'history',

        auth: PERMISSION_CODE.ROUTER_USER_TIMELINE
      }
    ];

    return routerData.filter((item) => {
      if (item.children) {
        item.children.filter((item2) => !item2.auth || userPermissionCodesMap[item2.auth]);
      }
      return !item.auth || userPermissionCodesMap[item.auth];
    });

    // if (ROUTE_PROJECT_INFO) {
    //   routerData.push({
    //     key: `/project/info?projectId=${id}`,
    //     name: '应用信息',
    //     icon: 'appstore',
    //     auth: ['admin']
    //   });
    // }

    // if (ROUTE_BOARD) {
    //   routerData.push({
    //     key: 'broad',
    //     name: '数据看板',
    //     icon: 'dashboard',
    //     action: ADD_BROAD,
    //     children: boardList.map((item) => ({
    //       key: `/project/board?projectId=${id}&boardId=${item.id}`,
    //       icon: 'file',
    //       name: item.name
    //     }))
    //   });
    // }

    // if (ROUTE_ANALYSE) {
    //   routerData.push({
    //     key: 'analyse',
    //     name: '行为分析',
    //     auth: ['dev', 'admin'],
    //     icon: 'gold',
    //     children: [
    //       {
    //         key: `/project/analyse/event?projectId=${id}`,
    //         icon: 'fund',
    //         name: '事件分析'
    //       },
    //       {
    //         key: `/project/analyse/funnel?projectId=${id}`,
    //         icon: 'filter',
    //         name: '漏斗分析'
    //       },
    //       {
    //         key: `/project/analyse/path?projectId=${id}`,
    //         icon: 'fork',
    //         name: '路径分析'
    //       }
    //     ]
    //   });
    // }

    // if (ROUTE_REPORT) {
    //   routerData.push({
    //     key: `/project/report-list?projectId=${id}`,
    //     name: '报表',
    //     icon: 'line-chart',
    //     auth: ['dev', 'admin']
    //   });
    // }

    // if (ROUTE_METADATA) {
    //   routerData.push({
    //     key: `/project/metadata-list?projectId=${id}`,
    //     name: '元数据',
    //     icon: 'database',
    //     auth: ['dev', 'admin']
    //   });
    // }

    // if (ROUTE_QUERY) {
    //   routerData.push({
    //     key: `/project/query?projectId=${id}`,
    //     name: '自定义查询',
    //     icon: 'search',
    //     auth: ['dev', 'admin']
    //   });
    // }

    // if (ROUTE_QUERY) {
    //   routerData.push({
    //     key: `/project/user-timeline?projectId=${id}`,
    //     name: '用户时间轴',
    //     icon: 'search',
    //     auth: ['dev', 'admin']
    //   });
    // }

    return routerData;
  }
);
