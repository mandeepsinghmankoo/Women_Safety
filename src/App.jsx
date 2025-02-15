import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import LoginUI from './components/LoginUI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="loginUI" element={<LoginUI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
