import React, { useState, useEffect } from 'react';
import SurveyForm from './SurveyForm';
import { fetchSurveys } from '../services/api';
import SurveyList from './SurveyList';
import logo from './logo.jpg' ;
const AdminPanel = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);
    try {
      const fetchedSurveys = await fetchSurveys();
      setSurveys(fetchedSurveys);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div>
      <header style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={ logo } alt="Sans" style={{ width: '50px', height: '50px' }} />
        <div>
          <h1><i className="fas fa-clipboard-list"></i>Openeyes Surveys Admin Panel</h1>
          <p>Create & Manage Surveys</p>
        </div>
      </header>
      
      <SurveyForm onSurveyCreated={loadSurveys} />
      <SurveyList surveys={surveys} loading={loading} onUpdate={loadSurveys} />
    </div>
  );
};

export default AdminPanel;
