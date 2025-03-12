import React, { useState } from "react";
import { submitSurveyAnswers } from "../../services/userApi";

const UserSurveyForm = ({ survey, username, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all questions are answered
    if (Object.keys(answers).length !== survey.questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitSurveyAnswers(survey.survey_number, username, answers, survey.questions);
      if (result.success) {
        onComplete(result);
      } else {
        setError("Failed to submit survey answers.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while submitting your answers");
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
            <h3 className="question-text">Q{index + 1}: {question.question_text}</h3>

            <div className="answer-input">
              {question.question_type === "qa" && (
                <textarea
                  placeholder="Type your answer here..."
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
              )}

              {question.question_type === "mcq" && (
                <div className="mcq-options">
                  {question.mcq_options?.map((option, i) => (
                    <label key={i} className="mcq-option">
                      <input
                        type="radio"
                        name={`mcq-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.question_type === "rating" && (
                <div className="rating-options">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="rating-option">
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        value={rating}
                        checked={answers[index] === rating}
                        onChange={() => handleAnswerChange(index, rating)}
                        required
                      />
                      ⭐ {rating}
                    </label>
                  ))}
                </div>
              )}
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
