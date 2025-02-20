import { showNotification } from './notification';

const API_URL = 'http://localhost:8000';
export async function accessSurvey(surveyId, username) {
    try {
      // First attempt to get the survey by its survey_number
      const response = await fetch(`${API_URL}/surveys/access/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          survey_number: surveyId,
          username: username 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Survey not found or access denied');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      showNotification('Failed to access survey', 'error');
      throw error;
    }
  }
  
  // Function to submit survey answers
  export async function submitSurveyAnswers(surveyId, username, answers, questions) {
    try {
      // Transform answers from index-based object to array of question-answer pairs
      const formattedAnswers = Object.entries(answers).map(([index, answer]) => ({
        question: questions[index],
        answer: answer
      }));

      console.log(formattedAnswers)

      console.log(JSON.stringify({
        survey_number: surveyId,
        username: username,
        answers: formattedAnswers,
        question: questions, 
      }))
      
      const response = await fetch(`${API_URL}/surveys/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          survey_number: surveyId,
          username: username,
          answers: formattedAnswers,
          question: questions, 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit survey answers');
      }
      
      const result = await response.json();
      showNotification('Survey submitted successfully', 'success');
      return {
        success: true,
        submissionId: result.submission_id || result._id
      };
    } catch (error) {
      console.error('Error:', error);
      showNotification('Failed to submit survey answers', 'error');
      throw error;
    }
  }