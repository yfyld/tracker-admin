import { createSelector } from 'reselect';
import { IStoreState } from '@/types';
import { IBoardInfo } from '@/api';

const boardListSelector = (state: IStoreState) => state.board.boardList.list;

export const boardListFiltersSelector = createSelector(
  boardListSelector,
  list => list.map(item => ({ text: item.name, value: item.name }))
);

export const boardListMapSelector = createSelector(
  boardListSelector,
  list =>
    list.reduce((total: { [prop: string]: IBoardInfo }, item) => {
      total[String(item.id)] = item;
      return total;
    }, {})
);
