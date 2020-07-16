import { createSelector } from 'reselect';
import { IStoreState } from '@/types';
import { ADD_BROAD } from '@/constants';

const projectIdSelector = (state: IStoreState) => state.project.projectInfo.id;
const boardListSelector = (state: IStoreState) => state.board.boardList.list;

export const menuDataSelector = createSelector(projectIdSelector, boardListSelector, (id, boardList) => {
  return [
    {
      key: `/project/info?projectId=${id}`,
      name: '应用信息',
      icon: 'appstore',
      auth: ['admin']
    },
    {
      key: 'broad',
      name: '数据看板',
      icon: 'dashboard',
      action: ADD_BROAD,
      children: boardList.map((item) => ({
        key: `/project/board?projectId=${id}&boardId=${item.id}`,
        icon: 'file',
        name: item.name
      }))
    },
    {
      key: 'analyse',
      name: '行为分析',
      auth: ['dev', 'admin'],
      icon: 'gold',
      children: [
        {
          key: `/project/analyse/event?projectId=${id}`,
          icon: 'fund',
          name: '事件分析'
        },
        {
          key: `/project/analyse/funnel?projectId=${id}`,
          icon: 'filter',
          name: '漏斗分析'
        },
        {
          key: `/project/analyse/path?projectId=${id}`,
          icon: 'fork',
          name: '路径分析'
        }
      ]
    },

    {
      key: `/project/report-list?projectId=${id}`,
      name: '报表',
      icon: 'line-chart',
      auth: ['dev', 'admin']
    },
    {
      key: `/project/metadata-list?projectId=${id}`,
      name: '元数据',
      icon: 'database',
      auth: ['dev', 'admin']
    },
    {
      key: `/project/query?projectId=${id}`,
      name: '自定义查询',
      icon: 'search',
      auth: ['dev', 'admin']
    }
  ];
});
