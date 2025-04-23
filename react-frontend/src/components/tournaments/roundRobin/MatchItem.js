import { useState } from 'react';

function MatchItem({ match, groupId, onMatchUpdate }) {
  const [editing, setEditing] = useState(false);
  const [scores, setScores] = useState({
    home: match.homeScore || 0,
    away: match.awayScore || 0
  });

  const handleScoreChange = (e, team) => {
    const value = parseInt(e.target.value) || 0;
    setScores(prev => ({
      ...prev,
      [team]: value
    }));
  };

  const handleSubmit = () => {
    onMatchUpdate(groupId, match._id, {
      homeScore: scores.home,
      awayScore: scores.away
    });
    setEditing(false);
  };

  return (
    <div className={`match-item ${match.played ? 'played' : ''}`}>
      <div className="teams">
        <span className="team home-team">{match.homeTeam.name}</span>
        <span className="vs">vs</span>
        <span className="team away-team">{match.awayTeam.name}</span>
      </div>
      
      {match.played ? (
        <div className="result">
          {match.homeScore} - {match.awayScore}
          <button 
            className="edit-btn"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="match-actions">
          {editing ? (
            <>
              <input
                type="number"
                min="0"
                value={scores.home}
                onChange={(e) => handleScoreChange(e, 'home')}
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                value={scores.away}
                onChange={(e) => handleScoreChange(e, 'away')}
              />
              <button className="save-btn" onClick={handleSubmit}>
                Save
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className="enter-result-btn"
              onClick={() => setEditing(true)}
            >
              Enter Result
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MatchItem;