import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, IPageData } from '@/types';
import { doGetMetadataList } from '@/store/actions';
import { IMetadataInfo, IMetadataListParam } from '@/api';

export interface MetadataState {
  metadataInfo: IMetadataInfo;
  metadataList: IPageData<IMetadataInfo>;
  getMetadataListParams: IMetadataListParam;
}

const initialState = (): MetadataState => ({
  metadataInfo: {
    id: null,
    name: null
  },
  metadataList: { totalCount: 0, list: [] },
  getMetadataListParams: { page: 1, pageSize: 20, projectId: 1 }
});

export const metadataReducer = (state: MetadataState = initialState(), action: Action): MetadataState => {
  switch (action.type) {
    case getType(doGetMetadataList.request):
      return update(state, { getMetadataListParams: { $set: action.payload } });
    case getType(doGetMetadataList.success):
      return update(state, {
        metadataList: { $set: action.payload }
      });
    default:
      return state;
  }
};
