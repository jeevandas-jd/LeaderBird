import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTournament, updateMatchResult } from './api';
import Bracket from './Bracket';

function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await getTournament(id);
        setTournament(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  const handleUpdateMatch = async (matchId, score1, score2, winnerId) => {
    try {
      const response = await updateMatchResult(id, matchId, score1, score2, winnerId);
      setTournament(response.data);
    } catch (err) {
      console.error('Error updating match:', err);
    }
  };

  if (loading) return <div>Loading tournament...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tournament) return <div>Tournament not found</div>;

  return (
    <div>
      <h1>{tournament.name}</h1>
      <Bracket tournament={tournament} onUpdateMatch={handleUpdateMatch} />
    </div>
  );
}

export default TournamentDetail;