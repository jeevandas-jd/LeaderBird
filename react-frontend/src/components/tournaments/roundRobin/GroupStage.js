import StandingsTable from './StandingsTable';
import MatchList from './MatchList';

function GroupStage({ group, onMatchUpdate }) {
  return (
    <section className="group-stage">
      <h2 className="group-name">{group.name}</h2>
      
      <div className="group-content">
        <StandingsTable standings={group.standings} />
        <MatchList 
          matches={group.matches} 
          groupId={group._id}
          onMatchUpdate={onMatchUpdate}
        />
      </div>
    </section>
  );
}

export default GroupStage;