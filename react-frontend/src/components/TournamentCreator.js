import React, { useState } from "react";
import axios from "axios";
import "./TournamentCreator.css"; // Import CSS file for styling

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
      const shuffledTeams = shuffleTeams(teams); // Randomize pairings
      console.log("hello before api call");
      const response = await axios.post("http://localhost:3000/api/create-game/bracket", {
        teams: shuffledTeams,
      });

      setBracket(response.data.bracket);
      
      console.log(response.data.bracket);
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
        <div className="bracket">
          <h3>Tournament Bracket</h3>
          {bracket.map((round, roundIndex) => (
            <div key={roundIndex} className="round">
              <h4>{roundIndex === bracket.length - 1 ? "Final" : `Round ${roundIndex + 1}`}</h4>
              {round.map((match, matchIndex) => (
                <p key={matchIndex}>{match.match || match.team}</p>
              ))}
              <h1>hello</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentCreator;
