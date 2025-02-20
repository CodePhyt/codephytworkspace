import { CohereClient } from 'cohere-ai';

const API_KEY = 'AcQGHNTP3QfRjMb7BwUwPHUNPgFrRDYNnvEpyaMX';
const cohere = new CohereClient({ token: API_KEY });

export const handleCohereChat = async (prompt, history = []) => {
  try {
    const response = await cohere.chat({
      message: prompt,
      chatHistory: history.map(msg => ({
        role: msg.type === 'user' ? 'USER' : 'CHATBOT',
        message: msg.content
      })),
      temperature: 0.7,
      maxTokens: 1000,
      model: 'command'
    });

    return {
      response: response.text,
      status: 'success'
    };
  } catch (error) {
    console.error('Error in Cohere chat:', error);
    return {
      response: 'Error occurred',
      status: 'error',
      error: error.message
    };
  }
};
