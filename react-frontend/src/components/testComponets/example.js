import { Bracket, RoundProps } from 'react-brackets';

const rounds = [
    {
      title: 'Round One',
      seeds: [
        { id: 1, date: new Date().toDateString(), teams: [{ name: 'Team A' }, { name: 'Team B' }] },
        { id: 2, date: new Date().toDateString(), teams: [{ name: 'Team C' }, { name: 'Team D' }] },
        { id: 3, date: new Date().toDateString(), teams: [{ name: 'Team E' }, { name: 'Team F' }] },
        { id: 4, date: new Date().toDateString(), teams: [{ name: 'Team G' }, { name: 'Team H' }] },
      ],
    },
    {
      title: 'Quarter-Finals',
      seeds: [
        { id: 5, date: new Date().toDateString(), teams: [{ name: 'Winner of Match 1' }, { name: 'Winner of Match 2' }] },
        { id: 6, date: new Date().toDateString(), teams: [{ name: 'Winner of Match 3' }, { name: 'Winner of Match 4' }] },
      ],
    },
    {
      title: 'Semi-Finals',
      seeds: [
        { id: 7, date: new Date().toDateString(), teams: [{ name: 'Winner of Match 5' }, { name: 'Winner of Match 6' }] },
      ],
    },
    {
      title: 'Final',
      seeds: [
        { id: 8, date: new Date().toDateString(), teams: [{ name: 'Winner of Match 7' }, { name: 'Runner-up of Match 7' }] },
      ],
    },
  ];
  
  console.log(rounds);
  
const Component = () => {
  return <Bracket rounds={rounds} />;
};


export default Component;