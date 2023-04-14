import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <h1>Home</h1>
  )
}

function Categories() {
  console.log(useLocation());
  console.log(window.location);
  return (
    <>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><Link to='/categories/sdfjsdfkjsdkjfsjkd'>Seminar</Link></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

function CategoriesDetail() {
  const { id } = useParams();

  return (
    <h1>Categories {id}</h1>
  )
}

function About() {
  return (
    <h1>About</h1>
  )
}

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => navigate('/') }>Submit</button>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:id' element={<CategoriesDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
