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
import CategoryEdit from './pages/categories/edit';
import CategoryCreate from './pages/categories/create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dahsboard />} />
        <Route path='/signin' element={<PageSignin />} />
        <Route path='/categories' element={<PageCategories />} />
        <Route path='/categories/create' element={<CategoryCreate />} />
        <Route path='/categories/edit/:id' element={<CategoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
