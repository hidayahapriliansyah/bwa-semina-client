import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import PageSignin from './pages/signin';
import './App.css';

function Home() {
  return (
    <h1>Home</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
      </ul> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<PageSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
