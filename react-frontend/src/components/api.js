import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tournaments';

export const createTournament = (name, teams) => {
  return axios.post(API_URL, { name, teams });
};

export const getTournaments = () => {
  return axios.get(API_URL);
};

export const getTournament = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateMatchResult = (tournamentId, matchId, score1, score2, winnerId) => {
  return axios.put(`${API_URL}/${tournamentId}/matches/${matchId}`, {
    score1,
    score2,
    winnerId
  });
};