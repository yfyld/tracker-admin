import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction } from '@/types';
import { doGetTeamList, doGetTeamInfo } from '@/store/actions';
import { ITeamInfo, ITeamListParam, ITeamList } from '@/api';
//import * as Api from "@/api"

export interface TeamState {
  teamInfo: ITeamInfo;
  teamList: ITeamList;
  teamListParam: ITeamListParam;
}

const initialState = (): TeamState => ({
  teamInfo: {
    id: null,
    name: '',
    creator: {
      nickname: '',
      username: '',
      id: null
    },
    members: [],
    description: ''
  },
  teamList: { totalCount: 0, list: [] },
  teamListParam: { page: 1, pageSize: 20, teamName: '' }
});

export const teamReducer = (state: TeamState = initialState(), action: IAction): TeamState => {
  switch (action.type) {
    case getType(doGetTeamList.request):
      return update(state, { teamListParam: { $set: action.payload } });
    case getType(doGetTeamList.success):
      return update(state, {
        teamList: { $set: action.payload }
      });
    case getType(doGetTeamInfo.success):
      return update(state, {
        teamInfo: { $set: action.payload }
      });

    default:
      return state;
  }
};
