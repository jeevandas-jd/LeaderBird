function TournamentHeader({ name, description }) {
    return (
      <header className="tournament-header">
        <h1 className="tournament-title">{name}</h1>
        {description && <p className="tournament-description">{description}</p>}
      </header>
    );
  }
  
  export default TournamentHeader;