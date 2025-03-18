// services/api.js - API service for all backend interactions
import { showNotification } from "./notification";

// const API_URL = "http://34.16.121.9:8000"; // server
const API_URL = "http://127.0.0.1:8000"; // local

// Generate a random survey number
export function generateSurveyNumber() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${year}${randomNum}`;
}

// Function to create a survey  
export async function createSurvey(surveyName) {
  try {
    const surveyNumber = generateSurveyNumber(); // Generate unique survey number

    console.log("Creating survey with:", { survey_number: surveyNumber, name: surveyName });

    const response = await fetch(`${API_URL}/surveys/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ survey_number: surveyNumber, name: surveyName }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture backend error message
      throw new Error(`Failed to create survey: ${errorText}`);
    }

    const result = await response.json();
    
    console.log("Survey Created Successfully:", result);

    showNotification("Survey created successfully", "success");
    showNotification(`Survey number: ${surveyNumber}`);
    return result;
  } catch (error) {
    console.error("Error:", error);
    showNotification(`Failed to create survey: ${error.message}`, "error");
    return null;
  }
}


// Function to fetch all surveys
export async function fetchSurveys() {
  try {
    const response = await fetch(`${API_URL}/surveys/`);

    if (!response.ok) {
      throw new Error("Failed to fetch surveys");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to fetch surveys", "error");
    return [];
  }
}

// Function to update survey name
export async function updateSurveyName(surveyId, newName) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/name/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) {
      throw new Error("Failed to update survey name");
    }
    showNotification("Survey name updated successfully", "success");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to update survey name", "error");
    return null;
  }
}

// Function to add a question
export async function addQuestion(surveyId, questionData) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData), // Send full question object
    });

    if (!response.ok) {
      throw new Error("Failed to add question");
    }

    showNotification("Question added successfully", "success");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to add question", "error");
    return null;
  }
}

// Function to update questions
export async function updateQuestions(surveyId, questions) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questions: questions }),
    });

    if (!response.ok) {
      throw new Error("Failed to update questions");
    }

    showNotification("Question updated successfully", "success");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to update questions", "error");
    return null;
  }
}

// Function to delete a question
export async function deleteQuestion(surveyId, questionText) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}/questions/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionText }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete question");
    }

    showNotification("Question deleted successfully", "success");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to delete question", "error");
    return null;
  }
}

// Function to delete a survey
export async function deleteSurvey(surveyId) {
  try {
    const response = await fetch(`${API_URL}/surveys/${surveyId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete survey");
    }

    showNotification("Survey deleted successfully", "success");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to delete survey", "error");
    return null;
  }
}

// Function to submit survey answers
export async function submitSurveyAnswers(surveyNumber, username, answers, questions) {
  try {
    const formattedAnswers = Object.entries(answers).map(([index, answer]) => ({
      question: questions[index].question_text,
      answer: answer,
    }));

    const response = await fetch(`${API_URL}/surveys/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        survey_number: surveyNumber,
        username: username,
        answers: formattedAnswers,
        question: questions.map((q) => q.question_text),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit survey answers");
    }

    const result = await response.json();
    showNotification("Survey submitted successfully", "success");
    return {
      success: true,
      submissionId: result.submission_id || result._id,
    };
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to submit survey answers", "error");
    return null;
  }
}
