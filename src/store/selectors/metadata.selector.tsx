import { createSelector } from 'reselect';
import { IStoreState } from '@/types';

const tagListSelector = (state: IStoreState) => state.metadata.tagList.list;

export const tagListFiltersSelector = createSelector(
  tagListSelector,
  list => list.map(item => ({ text: item.name, value: '' + item.id }))
);
