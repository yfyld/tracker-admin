import { IFieldInfo, IFieldListParam, ITagList } from './../../api/metadata.api';
import {
  doGetActiveMetadataList,
  doGetFieldList,
  doGetActiveFieldList,
  doGetTagList,
  doAddTag
} from './../actions/metadata.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { doGetMetadataList } from '@/store/actions';
import { IMetadataInfo, IMetadataListParam } from '@/api';

export interface MetadataState {
  metadataInfo: IMetadataInfo;
  //元数据列表
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  //用于分析数据
  activeMetadataList: IPageData<IMetadataInfo>;
  activeMetadataListParams: IMetadataListParam;
  //属性列表
  fieldList: IPageData<IFieldInfo>;
  fieldListParams: IFieldListParam;
  //用于分析数据(多个推荐字段)
  activeFieldList: IPageData<IFieldInfo>;

  tagList: ITagList;
}

const initialState = (): MetadataState => ({
  metadataInfo: {
    id: null,
    name: null,
    code: null
  },
  metadataList: { totalCount: 0, list: [] },
  metadataListParams: { page: 1, pageSize: 20, projectId: null },

  activeMetadataList: { totalCount: 0, list: [] },
  activeMetadataListParams: { page: 1, pageSize: 120, projectId: null, name: null, tags: null, status: 1 },

  fieldList: { totalCount: 0, list: [] },
  fieldListParams: { page: 1, pageSize: 20, projectId: null },
  activeFieldList: { totalCount: 0, list: [] },
  tagList: { totalCount: 0, list: [] }
});

export const metadataReducer = (state: MetadataState = initialState(), action: IAction): MetadataState => {
  switch (action.type) {
    case getType(doGetMetadataList.request):
      return update(state, { metadataListParams: { $set: action.payload } });
    case getType(doGetMetadataList.success):
      return update(state, {
        metadataList: { $set: action.payload }
      });

    case getType(doGetActiveMetadataList.request):
      return update(state, { activeMetadataListParams: { $set: action.payload } });
    case getType(doGetActiveMetadataList.success):
      return update(state, {
        activeMetadataList: { $set: action.payload }
      });

    case getType(doGetFieldList.request):
      return update(state, { fieldListParams: { $set: action.payload } });
    case getType(doGetFieldList.success):
      return update(state, {
        fieldList: { $set: action.payload }
      });
    case getType(doGetActiveFieldList.success):
      return update(state, {
        activeFieldList: { $set: action.payload }
      });

    case getType(doGetTagList.success):
      return update(state, {
        tagList: { $set: action.payload }
      });
    default:
      return state;
  }
};
