// services/api.js - API service for all backend interactions
import { showNotification } from './notification';

const API_URL = 'http://localhost:8000';  // Replace with your actual API URL

// Generate a random survey number
export function generateSurveyNumber() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000); 
  return `Survey ID-${year}-${randomNum}`;
}

// Function to create a survey  
export async function createSurvey(surveyName) {
  try {
    const surveyNumber = generateSurveyNumber();
    const response = await fetch(`${API_URL}/surveys/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey_number: surveyNumber }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create survey');
    }
    
    const result = await response.json();
    
    // Set the survey name after creation
    await updateSurveyName(result.id, surveyName);
    
    showNotification('Survey created successfully', 'success');
    return result;
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to create survey', 'error');
    return null;
  }
}

// Function to fetch all surveys
export async function fetchSurveys() {
  try {
    const response = await fetch(`${API_URL}/surveys/`);
    if (!response.ok) {
      throw new Error('Failed to fetch surveys');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to fetch surveys', 'error');
    return [];
  }
}

// Function to update survey name
export async function updateSurveyName(surveyId, newName) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/name/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) {
      throw new Error('Failed to update survey name');
    }
    showNotification('Survey name updated successfully', 'success');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to update survey name', 'error');
    return null;
  }
}

// Function to add a question
export async function addQuestion(surveyId, question) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });
    if (!response.ok) {
      throw new Error('Failed to add question');
    }
    showNotification('Question added successfully', 'success');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to add question', 'error');
    return null;
  }
}

// Function to update questions
export async function updateQuestions(surveyId, questions) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions: questions }),
    });
    if (!response.ok) {
      throw new Error('Failed to update questions');
    }
    showNotification('Question updated successfully', 'success');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to update questions', 'error');
    return null;
  }
}

// Function to delete a question
export async function deleteQuestion(surveyId, question) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete question');
    }
    showNotification('Question deleted successfully', 'success');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to delete question', 'error');
    return null;
  }
}

// Function to delete a survey
export async function deleteSurvey(surveyId) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete survey');
    }
    showNotification('Survey deleted successfully', 'success');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    showNotification('Failed to delete survey', 'error');
    return null;
  }
}