import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction } from '@/types';
import { doGetTeamList, doGetTeamInfo, doResetStore } from '@/store/actions';
import { ITeamInfo, ITeamListParam, ITeamList } from '@/api';

//import * as Api from "@/api"

export interface TeamState {
  teamInfo: ITeamInfo;
  teamList: ITeamList;
  teamListLoading: boolean;
  teamListParam: ITeamListParam;
}

const initialState = (): TeamState => ({
  teamInfo: {
    id: null,
    name: '',
    public: true,
    creator: {
      nickname: '',
      username: '',
      id: null
    },
    members: [],
    description: ''
  },
  teamListLoading: true,
  teamList: { totalCount: 0, list: [] },
  teamListParam: { page: 1, pageSize: 20, name: '', relevance: 1 }
});

export const teamReducer = (state: TeamState = initialState(), action: IAction): TeamState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doGetTeamList.request):
      return update(state, { teamListParam: { $set: action.payload }, teamListLoading: { $set: true } });
    case getType(doGetTeamList.success):
      return update(state, {
        teamList: { $set: action.payload },
        teamListLoading: { $set: false }
      });
    case getType(doGetTeamInfo.success):
      return update(state, {
        teamInfo: { $set: action.payload }
      });

    default:
      return state;
  }
};
