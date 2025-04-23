import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Auth/Sginup';
import Signin from './components/Auth/Signin';
import TournamentCreator from './components/TournamentCreator';
import Component from './components/testComponets/example';
import TournamentList from './components/TournamentList';
import TournamentDetail from './components/TournamentDetail';
import CreateTournament from './components/CreateTournament';
import ExampleBracket from './components/bracket/bracketII';
//import Bracket from './components/bracket/brackets-viwer';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
  x
        <Route path='/example' element={<Component/>}/>

        <Route path="/create-game" element={<TournamentList />} />
            <Route path="/tournaments/new" element={<CreateTournament />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
