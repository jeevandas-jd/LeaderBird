import React, { useState } from "react";
import axios from "axios";
import "./TournamentCreator.css"; // Import CSS file for styling
//import { Bracket, RoundProps } from 'react-brackets';
import Bracket from "../components/bracket/bracketII";
const TournamentCreator = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [bracket, setBracket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add a new team to the list
  const addTeam = () => {
    if (teamName.trim() !== "") {
      setTeams([...teams, teamName.trim()]);
      setTeamName("");
    }
  };

  // Remove a team from the list
  const removeTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  // Shuffle teams for fair matchups
  const shuffleTeams = (teams) => {
    return [...teams].sort(() => Math.random() - 0.5);
  };

  // Submit teams to backend API
  const createBracket = async () => {
    setError("");
    setBracket(null);
    setLoading(true);

    try {
        const shuffledTeams = shuffleTeams(teams);
        const response = await axios.post("http://localhost:3000/api/create-game/bracket", { teams: shuffledTeams });

        console.log(response.data.bracket);  // Debugging
        setBracket(response.data.bracket);
    } catch (err) {
        setError(err.response?.data?.message || "Error creating tournament.");
    } finally {
        setLoading(false);
    }
};
  return (
    <div className="tournament-container">
      <h2>Knockout Tournament Creator</h2>

      {/* Team Input Field */}
      <div className="team-input">
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button onClick={addTeam}>Add Team</button>
      </div>

      {/* Display Added Teams */}
      {teams.length > 0 && (
        <ul className="team-list">
          {teams.map((team, index) => (
            <li key={index}>
              {team} <button onClick={() => removeTeam(index)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      {/* Create Bracket Button */}
      <button
        className="create-btn"
        onClick={createBracket}
        disabled={teams.length < 2 || loading}
      >
        {loading ? "Generating..." : "Create Tournament"}
      </button>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Bracket if Generated */}
      {bracket && (
      <div className="bracket-container">
        <h3>Tournament Bracket</h3>
        <Bracket
          rounds={bracket.rounds.map((round, roundIndex) => ({
            title: roundIndex === bracket.rounds.length - 1 ? "Final" : `Round ${roundIndex + 1}`,
            seeds: round.matches.map((match) => ({
              id: match._id,
              teams: [
                { name: match.team1 },
                { name: match.team2 }
              ]
            }))
          }))}
        />
      </div>
    )}
    </div>
  );
};

export default TournamentCreator;