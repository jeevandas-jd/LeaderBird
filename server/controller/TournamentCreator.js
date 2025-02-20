import React, { useState } from "react";
import axios from "axios";
import "./TournamentCreator.css"; // Import CSS file for styling

const TournamentCreator = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [bracket, setBracket] = useState(null);
  const [error, setError] = useState("");

  // Add a new team to the list
  const addTeam = () => {
    if (teamName.trim() !== "") {
      setTeams([...teams, teamName]);
      setTeamName("");
    }
  };

  // Remove a team from the list
  const removeTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  // Submit teams to backend API
  const createBracket = async () => {
    setError("");
    setBracket(null);

    try {
      const response = await axios.post("http://localhost:3000/api/createBracket", { teams });
      setBracket(response.data.bracket);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating tournament.");
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
      <ul className="team-list">
        {teams.map((team, index) => (
          <li key={index}>
            {team} <button onClick={() => removeTeam(index)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Create Bracket Button */}
      <button className="create-btn" onClick={createBracket}>Create Tournament</button>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Bracket if Generated */}
      {bracket && (
        <div className="bracket">
          <h3>Tournament Bracket</h3>
          {bracket.map((round, roundIndex) => (
            <div key={roundIndex} className="round">
              <h4>Round {roundIndex + 1}</h4>
              {round.map((match, matchIndex) => (
                <p key={matchIndex}>
                  {match.match || match.team}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentCreator;
