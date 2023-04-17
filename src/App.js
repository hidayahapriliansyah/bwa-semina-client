import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import PageSignin from './pages/signin';
import './App.css';
import Dahsboard from './pages/dashboard';
import PageCategories from './pages/categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dahsboard />} />
        <Route path='/signin' element={<PageSignin />} />
        <Route path='/categories' element={<PageCategories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
