import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav'
import Login from './components/login'
import Home from './components/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <>
    <Nav />
    <Login/>
    </>
    /* 
  <Router>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </Router> 
  */
  );
}

export default App;
