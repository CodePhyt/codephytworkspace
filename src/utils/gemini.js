import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDAACsLpQAfg44a3fRQcR5_Un6zwYwQr_M';

if (!API_KEY) {
  console.error('No API key found!');
}

console.log('Using API key:', API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

const defaultConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1000,
};

const safetySettings = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
  }
];

export const handleChat = async (prompt, history = []) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: defaultConfig,
      safetySettings
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: msg.content
      })),
      generationConfig: defaultConfig,
      safetySettings
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
      response: `API Error: ${error.message}. Please contact support.`,
      status: 'error',
      error: error.message
    };
  }
};
