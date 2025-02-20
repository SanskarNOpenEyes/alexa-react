import React from 'react';

const CompletionScreen = ({ result, onStartNew }) => {
  return (
    <div className="completion-screen card">
      <div className="success-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2>Thank You!</h2>
      <p>Your survey responses have been successfully submitted.</p>
      <p className="submission-id">Submission ID: {result.submissionId}</p>
      
      <button className="btn primary" onClick={onStartNew}>
        <i className="fas fa-arrow-left"></i> Take Another Survey
      </button>
    </div>
  );
};

export default CompletionScreen;    