import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTournament } from './api';

function CreateTournament() {
  const [name, setName] = useState('');
  const [teams, setTeams] = useState(['', '', '', '']); // Default to 4 teams
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTeamChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const addTeam = () => {
    setTeams([...teams, '']);
  };

  const removeTeam = (index) => {
    if (teams.length <= 2) return;
    const newTeams = teams.filter((_, i) => i !== index);
    setTeams(newTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || teams.some(team => !team.trim())) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const teamObjects = teams.map(team => ({ name: team.trim() }));
      const response = await createTournament(name, teamObjects);
      navigate(`/tournaments/${response.data._id}`);
    } catch (error) {
      console.error('Error creating tournament:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Tournament</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tournament Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <h4>Teams</h4>
        {teams.map((team, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder={`Team ${index + 1}`}
              value={team}
              onChange={(e) => handleTeamChange(index, e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeTeam(index)}
              disabled={teams.length <= 2}
            >
              Remove
            </button>
          </div>
        ))}
        
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={addTeam}
          >
            Add Team
          </button>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Tournament'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTournament;