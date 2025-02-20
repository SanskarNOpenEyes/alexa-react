import React, { useState } from 'react';
import SurveyAccess from './SurveyAccess';
import UserSurveyForm from './SurveyForm';
import CompletionScreen from './CompletionScreen';
import './UserPanel.css';

const UserSurveyPanel = () => {
  const [currentView, setCurrentView] = useState('access');
  const [surveyData, setSurveyData] = useState(null);
  const [username, setUsername] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleSurveyAccess = (survey, user) => {
    setSurveyData(survey);
    setUsername(user);
    setCurrentView('form');
  };

  const handleSurveyComplete = (result) => {
    setSubmissionResult(result);
    setCurrentView('completion');
  };

  const handleStartNew = () => {
    setSurveyData(null);
    setUsername('');
    setSubmissionResult(null);
    setCurrentView('access');
  };

  return (
    <div className="user-survey-panel container">
      <header>
        <h1><i className="fas fa-poll-h"></i> Survey Portal</h1>
      </header>
      
      {currentView === 'access' && (
        <SurveyAccess onSurveyAccess={handleSurveyAccess} />
      )}
      
      {currentView === 'form' && surveyData && (
        <UserSurveyForm 
          survey={surveyData} 
          username={username}
          onComplete={handleSurveyComplete} 
        />
      )}
      
      {currentView === 'completion' && submissionResult && (
        <CompletionScreen 
          result={submissionResult}
          onStartNew={handleStartNew} 
        />
      )}
      
      <footer>
        <p>&copy; 2025 Survey Management System</p>
      </footer>
    </div>
  );
};

export default UserSurveyPanel;