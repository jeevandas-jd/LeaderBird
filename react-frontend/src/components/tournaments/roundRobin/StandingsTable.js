function StandingsTable({ standings }) {
    return (
      <div className="standings-table">
        <h3>Standings</h3>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => (
              <tr key={standing.team._id}>
                <td>{index + 1}</td>
                <td className="team-name">{standing.team.name}</td>
                <td>{standing.played}</td>
                <td>{standing.wins}</td>
                <td>{standing.draws}</td>
                <td>{standing.losses}</td>
                <td>{standing.goalsFor}</td>
                <td>{standing.goalsAgainst}</td>
                <td>{standing.goalsFor - standing.goalsAgainst}</td>
                <td className="points">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default StandingsTable;