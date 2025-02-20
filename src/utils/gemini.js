import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyC5jk1jpR7DAcGzRajk8qYTIDxg-uBLwF8';

if (!API_KEY) {
  console.error('No API key found!');
}

console.log('Using API key:', API_KEY);

export const handleChat = async (prompt, history = []) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: msg.content
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return {
      response: response.text(),
      status: 'success'
    };
  } catch (error) {
    console.error('Error in Gemini chat:', error);
    return {
      response: 'Error occurred',
      status: 'error',
      error: error.message
    };
  }
};
