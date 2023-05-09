import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    // ieumah ngadon siga ngakalan bug redux nu teu ngesave manehanana 
    listen();
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
