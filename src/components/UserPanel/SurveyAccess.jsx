import React, { useState } from 'react';
import { accessSurvey } from '../../services/userApi';

const SurveyAccess = ({ onSurveyAccess }) => {
  const [surveyId, setSurveyId] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const surveyData = await accessSurvey(surveyId, username);
      if (surveyData) {
        onSurveyAccess(surveyData, username);
      } else {
        setError('Unable to find survey. Please check the survey ID.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while accessing the survey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-access card">
      <h2>Access Survey</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="surveyId">Survey ID</label>
          <input
            type="text"
            id="surveyId"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
            placeholder="Enter Survey ID (e.g., Survey ID-2025-1234)"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? (
            <><i className="fas fa-spinner fa-spin"></i> Accessing...</>
          ) : (
            <><i className="fas fa-paper-plane"></i> Access Survey</>
          )}
        </button>
      </form>
    </div>
  );
};

export default SurveyAccess;