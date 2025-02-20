import { useEffect } from "react";
import BracketsViewer from "brackets-viewer";

const Bracket = () => {
  useEffect(() => {
    // Get the container where the bracket will be rendered
    const container = document.getElementById("bracket");

    // Sample tournament data
    const tournamentData = {
      type: "single_elimination",
      participants: [
        { id: 1, name: "Participant 1" },
        { id: 2, name: "Participant 2" },
        { id: 3, name: "Participant 3" },
        { id: 4, name: "Participant 4" },
        { id: 5, name: "Participant 5" },
        { id: 6, name: "Participant 6" },
      ],
      matches: [
        { id: 1, round: 1, sides: { home: { participantId: 1 }, away: { participantId: 2 } } },
        { id: 2, round: 1, sides: { home: { participantId: 3 }, away: { participantId: 4 } } },
        { id: 3, round: 1, sides: { home: { participantId: 5 }, away: { participantId: 6 } } },
        { id: 4, round: 2, sides: { home: { participantId: 1 }, away: { participantId: 3 } } },
        { id: 5, round: 2, sides: { home: { participantId: 5 }, away: { participantId: null } } },
      ],
    };

    // Initialize Brackets Viewer
    const viewer = new BracketsViewer(container);
    viewer.render(tournamentData);
  }, []);

  return <div id="bracket"></div>;
};

export default Bracket;
