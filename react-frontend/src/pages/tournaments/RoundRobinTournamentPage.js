import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTournament } from '../../services/tournaments/roundRobin';
import TournamentHeader from '../../components/tournaments/roundRobin/TournamentHeader';
import GroupStage from '../../components/tournaments/roundRobin/GroupStage';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import {  
    
    updateMatchResult  // Make sure this is imported
  } from '../../services/tournaments/roundRobin';
function RoundRobinTournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const data = await fetchTournament(id);
        setTournament(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadTournament();
  }, [id]);

  const handleMatchUpdate = async (groupId, matchId, scores) => {
    try {
      const updatedTournament = await updateMatchResult(
        id,
        groupId,
        matchId,
        scores
      );
      setTournament(updatedTournament);
    } catch (err) {
      console.error('Failed to update match:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!tournament) return <ErrorMessage message="Tournament not found" />;

  return (
    <div className="round-robin-tournament">
      <TournamentHeader 
        name={tournament.name} 
        description={tournament.description} 
      />
      
      <div className="groups-container">
        {tournament.groups.map(group => (
          <GroupStage 
            key={group._id}
            group={group}
            onMatchUpdate={handleMatchUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default RoundRobinTournamentPage;