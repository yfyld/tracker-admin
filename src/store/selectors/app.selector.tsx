import { createSelector } from 'reselect';
import { IStoreState } from '@/types';

const projectIdSelector = (state: IStoreState) => state.project.projectInfo.id;
const boardListSelector = (state: IStoreState) => state.board.boardList.list;

export const menuDataSelector = createSelector(projectIdSelector, boardListSelector, (id, boardList) => {
  return [
    {
      key: `/project/info?projectId=${id}`,
      name: '项目信息',
      icon: 'setting',
      auth: ['admin']
    },
    {
      key: 'broad',
      name: '数据看板',
      icon: 'setting',
      children: boardList.map(item => ({
        key: `/project/board?projectId=${id}&boardId=${item.id}`,
        icon: 'setting',
        name: item.name
      }))
    },
    {
      key: 'analyse',
      name: '行为分析',
      auth: ['dev', 'admin'],
      icon: 'setting',
      children: [
        {
          key: `/project/analyse-event?projectId=${id}`,
          icon: 'setting',
          name: '事件分析'
        }
      ]
    },
    {
      key: `/project/metadata-list?projectId=${id}`,
      name: '元数据',
      icon: 'setting',
      auth: ['dev', 'admin']
    },
    {
      key: `/project/report-list?projectId=${id}`,
      name: '报表',
      icon: 'setting',
      auth: ['dev', 'admin']
    }
  ];
});
