// components/SurveyList.jsx - Component to display the list of surveys
import React from 'react';
import SurveyItem from './SurveyItem';

const SurveyList = ({ surveys, loading, onUpdate }) => {
  return (
    <div className="survey-list card">
      <h2>Your Surveys</h2>
      <div className="counter">
        Found <span id="surveyCount">{surveys.length}</span> surveys
      </div>

      {loading && (
        <div className="loading-indicator">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      )}

      <div className="survey-accordion">
        {surveys.length === 0 ? (
          <div className="empty-state">
            No surveys found. Create your first survey above.
          </div>
        ) : (
          surveys.map((survey) => (
            <SurveyItem 
              key={survey.id} 
              survey={survey} 
              onUpdate={onUpdate} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SurveyList;
