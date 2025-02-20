import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import SurveyList from './components/SurveyList';
import { fetchSurveys } from './services/api';
import AdminPanel from './components/AdminPanel';
import UserSurveyPanel from './components/UserPanel/UserSurveyPanel';
import './App.css';

const HomePage = () => (
  <div className="home-page">
    <h1>Survey Management System</h1>
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
        <header>
          <h1><i className="fas fa-clipboard-list"></i> Survey Management System</h1>
        </header>
        <SurveyForm onSurveyCreated={loadSurveys} />
        <SurveyList 
          surveys={surveys} 
          loading={loading}
          onUpdate={loadSurveys}
        />
        <footer>
          <p>&copy; 2025 Survey Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;