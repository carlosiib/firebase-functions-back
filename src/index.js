import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import UsuarioProvider from "./context/UsuarioProvider.js"

ReactDOM.render(
  <React.StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
