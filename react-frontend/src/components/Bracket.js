import React from 'react';

function Bracket({ tournament, onUpdateMatch }) {
  const maxRounds = Math.max(...tournament.matches.map(m => m.round), 0);
  
  const handleSubmit = (e, match) => {
    e.preventDefault();
    const form = e.target;
    const score1 = parseInt(form.score1.value);
    const score2 = parseInt(form.score2.value);
    const winnerId = score1 > score2 ? match.team1._id : match.team2._id;
    
    onUpdateMatch(match._id, score1, score2, winnerId);
  };

  return (
    <div className="bracket">
      {Array.from({ length: maxRounds }, (_, i) => i + 1).map(round => (
        <div key={round} className="round">
          <h3>Round {round}</h3>
          <div className="matches">
            {tournament.matches
              .filter(match => match.round === round)
              .map(match => (
                <div key={match._id} className="match card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="team">
                        {match.team1 ? match.team1.name : 'TBD'} 
                        {match.completed && ` (${match.score1})`}
                      </div>
                      <div className="vs">vs</div>
                      <div className="team">
                        {match.team2 ? match.team2.name : 'TBD'}
                        {match.completed && ` (${match.score2})`}
                      </div>
                    </div>
                    
                    {!match.completed && match.team1 && match.team2 && (
                      <form onSubmit={(e) => handleSubmit(e, match)} className="mt-2">
                        <div className="input-group">
                          <input 
                            type="number" 
                            name="score1" 
                            className="form-control" 
                            placeholder="Score" 
                            min="0" 
                            required 
                          />
                          <input 
                            type="number" 
                            name="score2" 
                            className="form-control" 
                            placeholder="Score" 
                            min="0" 
                            required 
                          />
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </form>
                    )}
                    
                    {match.completed && (
                      <div className="winner mt-2">
                        Winner: {match.winner?.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bracket;