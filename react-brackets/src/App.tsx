import React from 'react';
import logo from './logo.svg';
import './App.css';
import Brackets from './components/bracket';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>React Brackets</h1>
        <Brackets />
      </header>
    </div>
  );
}

export default App;
