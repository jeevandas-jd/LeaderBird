import api from './api';

export const fetchTournament = async (id) => {
  const response = await api.get(`/round-robin/${id}`);
  return response.data;
};

export const updateMatchResult = async (tournamentId, groupId, matchId, scores) => {
  const response = await api.put(
    `/round-robin/${tournamentId}/groups/${groupId}/matches/${matchId}`,
    scores
  );
  return response.data;
};

export const createTournament = async (tournamentData) => {
  const response = await api.post('/round-robin', tournamentData);
  return response.data;
};