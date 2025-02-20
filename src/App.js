// App.jsx - Main application component
import React, { useState, useEffect } from 'react';
import SurveyForm from './components/SurveyForm';
import SurveyList from './components/SurveyList';
import { fetchSurveys } from './services/api';
import './App.css';

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
  );
};

export default App;