import * as React from 'react';
import ProjectList from '../projectList/ProjectList';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { ITeamInfo } from '@/api';
import AvatarText from '@/components/AvatarText';

interface Props {
  teamInfo: ITeamInfo;
}

const TeamInfo = ({ teamInfo }: Props) => {
  return (
    <div>
      {/* <h3>
        <AvatarText info={teamInfo.creator} />
        {teamInfo.name}
      </h3>
      <div>
        {teamInfo.members.map(member => (
          <AvatarText key={member.id} size='mini' color='#999' info={member} />
        ))}
      </div> */}
      <h2>
        <strong>{teamInfo.name}</strong>团队项目
      </h2>
      <ProjectList></ProjectList>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

const mapStateToProps = (state: IStoreState) => {
  const { teamInfo } = state.team;
  return {
    teamInfo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamInfo);
