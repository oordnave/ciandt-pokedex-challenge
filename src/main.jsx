import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes';
import PokemonProvider from './context/PokemonContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokemonProvider>
      <Routes />
    </PokemonProvider>
  </React.StrictMode>,
);
