import React from 'react';

const Bracket = ({ rounds = [] }) => {
  // Guard against undefined/null rounds
  if (!rounds || !Array.isArray(rounds)) {
    return (
      <div className="p-4 text-red-500">
        Error: Invalid tournament data provided
      </div>
    );
  }

  // If rounds array is empty
  if (rounds.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No tournament data available
      </div>
    );
  }

  return (
    <div className="flex gap-8 p-8 overflow-x-auto min-h-[600px]">
      {rounds.map((round, roundIndex) => (
        <div
          key={roundIndex}
          className="flex flex-col justify-around min-w-[200px]"
        >
          <div className="text-lg font-bold mb-4 text-center">
            {round.title || `Round ${roundIndex + 1}`}
          </div>
          <div className="flex flex-col justify-around h-full">
            {(round.seeds || []).map((seed, seedIndex) => (
              <div
                key={seed?.id || seedIndex}
                className="relative"
              >
                <div className="mb-8">
                  <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                    {(seed?.teams || [{}, {}]).map((team, teamIndex) => (
                      <div
                        key={teamIndex}
                        className={`p-2 ${
                          teamIndex === 0 ? 'border-b border-gray-200' : ''
                        }`}
                      >
                        <span className="font-medium">{team?.name || 'TBD'}</span>
                      </div>
                    ))}
                  </div>
                  {/* Connector lines */}
                  {roundIndex < rounds.length - 1 && (
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

// Example usage with sample data
const ExampleBracket = () => {
    const sampleData = {
      rounds: [
        {
          title: "Round 1",
          seeds: [
            {
              id: "1",
              teams: [
                { name: "Team A" },
                { name: "Team B" }
              ]
            },
            {
              id: "2",
              teams: [
                { name: "Team C" },
                { name: "Team D" }
              ]
            }
          ]
        },
        {
          title: "Final",
          seeds: [
            {
              id: "3",
              teams: [
                { name: "Team A" },
                { name: "Team C" }
              ]
            }
          ]
        }
      ]
    };
  
    return <Bracket rounds={sampleData.rounds} />;
  };
  
export default ExampleBracket;
  
