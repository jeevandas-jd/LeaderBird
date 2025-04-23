// src/pages/tournaments/CreateRoundRobinPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  createTournament } from '../../services/tournaments/roundRobin';
import { Users, Plus, Minus, Trophy } from 'lucide-react';

const CreateRoundRobinPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teams, setTeams] = useState(['', '']);
  const [hasTwoLegs, setHasTwoLegs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    setError('');
    
    if (!name.trim()) {
      setError('Tournament name is required');
      return;
    }

    const validTeams = teams.filter(team => team.trim() !== '');
    if (validTeams.length < 2) {
      setError('At least 2 teams are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const tournamentData = {
        name,
        description,
        teams: validTeams,
        hasTwoLegs
      };
      
      const createdTournament = await createTournament(tournamentData);
      navigate(`/round-robin/${createdTournament._id}`);
    } catch (err) {
      console.error('Creation error:', err);
      setError(err.message || 'Failed to create tournament');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Create Round Robin Tournament</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tournament Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Champions League 2023"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Optional tournament description"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Teams *
            </label>
            <button
              type="button"
              onClick={addTeam}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Team
            </button>
          </div>
          
          <div className="space-y-2">
            {teams.map((team, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={team}
                  onChange={(e) => handleTeamChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Team ${index + 1}`}
                />
                {teams.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeTeam(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">At least 2 teams required</p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="twoLegs"
            checked={hasTwoLegs}
            onChange={(e) => setHasTwoLegs(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="twoLegs" className="ml-2 block text-sm text-gray-700">
            Include home and away matches (two legs)
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Tournament'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoundRobinPage;