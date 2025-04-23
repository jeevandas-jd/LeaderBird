import MatchItem from './MatchItem';

function MatchList({ matches, groupId, onMatchUpdate }) {
  return (
    <div className="match-list">
      <h3>Matches</h3>
      <div className="matches-container">
        {matches.map(match => (
          <MatchItem
            key={match._id}
            match={match}
            groupId={groupId}
            onMatchUpdate={onMatchUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchList;