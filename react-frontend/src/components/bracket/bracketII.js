import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bracket = ({ rounds = [], bracketId }) => {
  const [localRounds, setLocalRounds] = useState(rounds);

  useEffect(() => {
    setLocalRounds(rounds);
  }, [rounds]);

  const updateResult = async (roundNo, matchIndex, score1, score2,bracketId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/create-game/result`, {
        roundNo,
        matchNo: matchIndex,
        score1,
        score2,
        bracketId
      });
      setLocalRounds(response.data.bracket.rounds);
    } catch (error) {
      console.error('Failed to update result:', error);
    }
  };

  const scheduleNextRound = async (roundNo, winners,bracketId) => {
    try {
      await axios.post(`http://localhost:3000/api/create-game/schedule`, {
        roundNo,
        winners,
        bracketId
      });
    } catch (error) {
      console.error('Failed to schedule matches:', error);
    }
  };  

  if (!localRounds || !Array.isArray(localRounds)) {
    return <div className="p-4 text-red-500">Error: Invalid tournament data provided</div>;
  }

  if (localRounds.length === 0) {
    return <div className="p-4 text-gray-500">No tournament data available</div>;
  }

  return (
    <div className="flex gap-8 p-8 overflow-x-auto min-h-[600px]">
      {localRounds.map((round, roundIndex) => (
        <div key={roundIndex} className="flex flex-col justify-around min-w-[200px]">
          <div className="text-lg font-bold mb-4 text-center">
            {round.title || `Round ${roundIndex + 1}`}
          </div>
          <div className="flex flex-col justify-around h-full">
            {(round.seeds || []).map((seed, seedIndex) => (
              <div key={seed?.id || seedIndex} className="relative">
                <div className="mb-8">
                  <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                    {(seed?.teams || [{}, {}]).map((team, teamIndex) => (
                      <div
                        key={teamIndex}
                        className={`p-2 ${teamIndex === 0 ? 'border-b border-gray-200' : ''}`}
                      >
                        <span className="font-medium">{team?.name || 'TBD'}</span>
                      </div>
                    ))}
                    <div className="mt-2">
                      <input
                        type="number"
                        placeholder="Score 1"
                        onChange={(e) => (seed.score1 = e.target.value)}
                        className="border p-1 mr-2"
                      />
                      <input
                        type="number"
                        placeholder="Score 2"
                        onChange={(e) => (seed.score2 = e.target.value)}
                        className="border p-1"
                      />
                      <button
                        onClick={() => updateResult(roundIndex + 1, seedIndex, seed.score1, seed.score2)}
                        className="bg-blue-500 text-white p-1 rounded ml-2"
                      >
                        Update Result
                      </button>
                    </div>
                  </div>
                  {roundIndex < localRounds.length - 1 && (
                    <>
                      <div className="absolute right-0 top-1/2 w-8 border-t border-gray-300" />
                      {seedIndex % 2 === 0 && (
                        <div className="absolute right-0 top-1/2 h-16 border-r border-gray-300" />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bracket;
