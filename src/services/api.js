import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL; // adjust this to your backend URL

export const questionService = {
  getQuestions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/question/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createQuestion: async (questionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, {
        ...questionData,
        points: questionData.points || 1
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateQuestion: async (id, questionData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/question/update/${id}`, questionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
