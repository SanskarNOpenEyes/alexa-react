// components/SurveyItem.jsx - Component for individual survey items
import React, { useState } from 'react';
import { updateSurveyName, deleteSurvey, addQuestion, updateQuestions, deleteQuestion } from '../services/api';

const SurveyItem = ({ survey, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionType, setQuestionType] = useState('qa'); // Default type
  const [mcqOptions, setMcqOptions] = useState(['']);

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
    const newQuestionText = prompt('Edit question:', survey.questions[index]?.question_text);
    if (newQuestionText) {
      const updatedQuestions = [...survey.questions];
      updatedQuestions[index].question_text = newQuestionText;
      await updateQuestions(survey.id, updatedQuestions);
      onUpdate();
    }
  };

  const handleDeleteQuestion = async (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const questionText = survey.questions[index]?.question_text;
      const questionType = survey.questions[index]?.question_type;
      if (!questionText) {
        console.error("❌ No question text found for deletion!");
        return;
      }

      if (!questionType) {
        console.error("❌ No question type found for deletion!");
        return; 
      }
  
      console.log(`🛠 Attempting to delete: ${questionText}`); // Debugging log
  
      await deleteQuestion(survey.id, questionText, questionType);
      onUpdate(); 
    }
  };
  

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const questionData = {
        question_text: newQuestion,
        question_type: questionType,
        mcq_options: questionType === "mcq" ? mcqOptions.filter(opt => opt.trim() !== '') : undefined, // Include mcq_options if MCQ
      };
  
      console.log("Sending question data:", JSON.stringify(questionData, null, 2)); // Debugging log
  
      try {
        await addQuestion(survey.id, questionData);
        setNewQuestion('');
        setMcqOptions(['']); // Reset MCQ options
        onUpdate();
      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };
  

  return (
    <div className="survey-item">
      <button className={`accordion ${isExpanded ? 'active' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
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
            <div className="empty-state">No questions yet. Add your first question below.</div>
          ) : (
            survey.questions.map((question, index) => (
              <div className="question" key={index}>
                <div className="question-content">
                  <span className="question-number">Q{index + 1}.</span>
                  <span className="question-text">{question.question_text}</span>
                  <span className="question-type">({question.question_type || 'QA'})</span> 
                </div>
                <div className="edit-buttons">
                  <button className="btn secondary edit-question" onClick={() => handleEditQuestion(index)}>
                    <i className="fas fa-edit">Rename</i>
                  </button>
                  <button className="btn danger delete-question" onClick={() => handleDeleteQuestion(index)}>
                    <i className="fas fa-trash">Delete</i>
                  </button>
                </div>
              </div>
            ))
          )}

          <form className="add-question-form" onSubmit={handleAddQuestion}>
            <input type="text" placeholder="Type new question here" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />

            <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
              <option value="qa">QA (Text Answer)</option>
              <option value="mcq">MCQ (Multiple Choice)</option>
              <option value="rating">Rating-Based</option>
            </select>

            {questionType === 'mcq' && (
              <div className="mcq-options">
                {mcqOptions.map((option, index) => (
                  <div key={index} className="mcq-option">
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...mcqOptions];
                        newOptions[index] = e.target.value;
                        setMcqOptions(newOptions);
                      }}
                    />
                    <button type="button" onClick={() => setMcqOptions(mcqOptions.filter((_, i) => i !== index))}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => setMcqOptions([...mcqOptions, ''])}>➕ Add Option</button>
              </div>
            )}

            <button type="submit" className="btn primary">➕ Add Question</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyItem;
