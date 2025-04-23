import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTournaments } from './api';

function TournamentList() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
        setTournaments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <div>Loading tournaments...</div>;
  }

  return (
    <div>
      <h1>Tournaments</h1>
      <Link to="/tournaments/new" className="btn btn-primary mb-3">
        Create New Tournament
      </Link>
      <div className="list-group">
        {tournaments.map(tournament => (
          <Link
            key={tournament._id}
            to={`/tournaments/${tournament._id}`}
            className="list-group-item list-group-item-action"
          >
            <h5>{tournament.name}</h5>
            <small>
              {tournament.teams.length} teams | Created: {new Date(tournament.createdAt).toLocaleDateString()}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TournamentList;