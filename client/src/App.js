import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context';
import Login from './components/login';
import HomePage from './components/homePage';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:username/homePage" element={<HomePage />} >
            {/* <Route path="/:username/info" element={<Info />} />
            <Route path="/:username/posts" element={<Posts />} />
            <Route path="/:username/todos" element={<Todos />} /> */}
          </Route>
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
