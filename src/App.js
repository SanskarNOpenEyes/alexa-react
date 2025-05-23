import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import SurveyForm from './components/SurveyForm';
// import SurveyList from './components/SurveyList';
import { fetchSurveys } from './services/api';
import AdminPanel from './components/AdminPanel';
import UserSurveyPanel from './components/UserPanel/UserSurveyPanel';
import './App.css';
import logo from './components/logo.jpg' ;


const HomePage = () => (
  <div className="home-page">
    <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', marginBottom: '1rem' }} />
    <h1>OpenEyes Survey System</h1>
    
    <div className="portal-options">
      <Link to="/admin" className="portal-option admin">
        <i className="fas fa-user-shield"></i>
        <h2>Admin Portal</h2>
        <p>Create and manage surveys</p>
      </Link>
      <Link to="/take-survey" className="portal-option user">
        <i className="fas fa-clipboard-check"></i>
        <h2>User Portal</h2>
        <p>Take a survey</p>
      </Link>
    </div>
  </div>
);

const App = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    const fetchedSurveys = await fetchSurveys();
    setSurveys(fetchedSurveys);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/take-survey" element={<UserSurveyPanel />} />
      </Routes>
      <div className="container">
        
        <footer>
          <p>&copy; 2025 Survey Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;