// components/SurveyItem.jsx - Component for individual survey items
import React, { useState } from 'react';
import { 
  updateSurveyName, 
  deleteSurvey, 
  addQuestion, 
  updateQuestions, 
  deleteQuestion 
} from '../services/api';

const SurveyItem = ({ survey, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const handleRename = async () => {
    const newName = prompt('Enter new survey name:', survey.name || '');
    if (newName) {
      await updateSurveyName(survey.id, newName);
      onUpdate();
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the survey "${survey.name || survey.survey_number}"?`)) {
      await deleteSurvey(survey.id);
      onUpdate();
    }
  };

  const handleEditQuestion = async (index) => {
    const newQuestionText = prompt('Edit question:', survey.questions[index]);
    if (newQuestionText) {
      const updatedQuestions = [...survey.questions];
      updatedQuestions[index] = newQuestionText;
      await updateQuestions(survey.id, updatedQuestions);
      onUpdate();
    }
  };

  const handleDeleteQuestion = async (index) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(survey.id, survey.questions[index]);
      onUpdate();
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      await addQuestion(survey.id, newQuestion);
      setNewQuestion('');
      onUpdate();
    }
  };

  return (
    <div className="survey-item">
      <button 
        className={`accordion ${isExpanded ? 'active' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="survey-info">
          <span className="survey-name">{survey.name || 'Unnamed Survey'}</span>
        </div>
        <div className="action-buttons" onClick={(e) => e.stopPropagation()}>
          <button className="btn secondary edit-name" onClick={handleRename}>
            <i className="fas fa-edit"></i> Rename
          </button>
          <button className="btn danger delete-survey" onClick={handleDelete}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </button>

      <div className="panel" style={{ maxHeight: isExpanded ? '1000px' : '0' }}>
        <div className="panel-content">
          <div className="questions-header">
            <h3>Questions ({survey.questions.length})</h3>
          </div>
          
          {survey.questions.length === 0 ? (
            <div className="empty-state">
              No questions yet. Add your first question below.
            </div>
          ) : (
            survey.questions.map((question, index) => (
              <div className="question" key={index}>
                <div className="question-content">
                  <span className="question-number">Q{index + 1}.</span>
                  <span className="question-text">{question}</span>
                </div>
                <div className="edit-buttons">
                  <button 
                    className="btn secondary edit-question"
                    onClick={() => handleEditQuestion(index)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn danger delete-question"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}

          <form className="add-question-form" onSubmit={handleAddQuestion}>
            <input 
              type="text" 
              placeholder="Type new question here"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button type="submit" className="btn primary">
              <i className="fas fa-plus"></i> Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyItem;