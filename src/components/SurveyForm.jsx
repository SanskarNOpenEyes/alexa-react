// components/SurveyForm.jsx - Form for creating new surveys
import React, { useState } from 'react';
import { createSurvey } from '../services/api';
import { showNotification } from '../services/notification';

const SurveyForm = ({ onSurveyCreated }) => {
  const [surveyName, setSurveyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (surveyName.trim() === '') {
      showNotification('Please enter a survey name', 'error');
      return;
    }
    
    setIsSubmitting(true);
    const result = await createSurvey(surveyName);
    setIsSubmitting(false);
    
    if (result) {
      setSurveyName('');
      onSurveyCreated();
    }
  };

  return (
    <div className="create-survey card">
      <h2>Create New Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="surveyName">Survey Name</label>
          <input 
            type="text" 
            id="surveyName" 
            placeholder="Enter survey name" 
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="btn primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><i className="fas fa-spinner fa-spin"></i> Creating...</>
          ) : (
            <><i className="fas fa-plus"></i> Create Survey</>
          )}
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;