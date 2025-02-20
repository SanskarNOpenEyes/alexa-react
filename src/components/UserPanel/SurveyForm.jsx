import React, { useState } from 'react';
import { submitSurveyAnswers } from '../../services/userApi';

const UserSurveyForm = ({ survey, username, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    if (Object.keys(answers).length !== survey.questions.length) {
      setError('Please answer all questions before submitting.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await submitSurveyAnswers(survey._id, username, answers, survey.questions);
      if (result.success) {
        onComplete(result);
      } else {
        setError('Failed to submit survey answers.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your answers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-survey-form card">
      <h2>{survey.name || survey.survey_number}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question, index) => (
          <div className="question-item" key={index}>
            <h3 className="question-text">Q{index + 1}: {question}</h3>
            <div className="answer-input">
              <textarea
                placeholder="Type your answer here..."
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        
        <div className="form-actions">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
            ) : (
              <><i className="fas fa-check-circle"></i> Submit Answers</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSurveyForm;