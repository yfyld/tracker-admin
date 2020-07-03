import { IListData } from './../../types/index';
import { IFieldInfo, ITagList } from './../../api/metadata.api';
import {
  doGetActiveMetadataList,
  doGetFieldList,
  doGetTagList,
  doAddMetadataByExcel
} from './../actions/metadata.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { doGetMetadataList, doResetStore } from '@/store/actions';
import { IMetadataInfo, IMetadataListParam } from '@/api';

export interface IFieldListMap {
  [prop: string]: IListData<IFieldInfo>;
}
export interface MetadataState {
  metadataInfo: IMetadataInfo;
  //元数据列表
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  //用于分析数据
  activeMetadataList: IPageData<IMetadataInfo>;
  activeMetadataListParams: IMetadataListParam;
  //属性列表
  fieldListMap: IFieldListMap;

  tagList: ITagList;

  uploading: boolean;
}

const initialState = (): MetadataState => ({
  metadataInfo: {
    id: null,
    name: null,
    code: null,
    type: null,
    description: null,
    status: null,
    projectId: null,
    tags: [],
    log: null,
    logByApp: null,
    operatorType: 0,
    recentLog: null
  },
  metadataList: { totalCount: 0, list: [] },
  metadataListParams: { page: 1, pageSize: 20, projectId: null },

  activeMetadataList: { totalCount: 0, list: [] },
  activeMetadataListParams: {
    page: 1,
    pageSize: 120,
    projectId: null,
    name: null,
    tags: null,
    status: 1,
    isAssociation: true
  },

  fieldListMap: {},

  tagList: { totalCount: 0, list: [] },
  uploading: false
});

export const metadataReducer = (state: MetadataState = initialState(), action: IAction): MetadataState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
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

    case getType(doGetFieldList.success):
      return update(state, {
        fieldListMap: { $set: action.payload }
      });

    case getType(doGetTagList.success):
      return update(state, {
        tagList: { $set: action.payload }
      });

    case getType(doAddMetadataByExcel.request):
      return update(state, { uploading: { $set: true } });
    case getType(doAddMetadataByExcel.success):
      return update(state, {
        uploading: { $set: false }
      });
    default:
      return state;
  }
};
