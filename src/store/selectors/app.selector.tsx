import { createSelector } from 'reselect';
import { IStoreState } from '@/types';

const projectIdSelector = (state: IStoreState) => state.project.projectInfo.id;

export const menuDataSelector = createSelector(
  projectIdSelector,
  id => {
    return [
      {
        key: `/project/${id}/info`,
        name: '项目信息',
        icon: 'setting',
        auth: ['admin']
      },
      {
        key: 'broad',
        name: '数据看板',
        icon: 'setting',
        children: [
          {
            key: `/project/${id}/board/1`,
            icon: 'setting',
            name: '老板看板'
          }
        ]
      },
      {
        key: 'analyse',
        name: '行为分析',
        auth: ['dev', 'admin'],
        icon: 'setting',
        children: [
          {
            key: `/project/${id}/analyse-event`,
            icon: 'setting',
            name: '事件分析'
          }
        ]
      },
      {
        key: `/project/${id}/event-list`,
        name: '元数据',
        icon: 'setting',
        auth: ['dev', 'admin']
      },
      {
        key: `/project/${id}/report-list`,
        name: '草稿箱',
        icon: 'setting',
        auth: ['dev', 'admin']
      }
    ];
  }
);
