import MistralClient from '@mistralai/mistralai';

const API_KEY = 'jAgzpFJSfh4YAdGaDIoHEKxeLZIVjUZw';
const client = new MistralClient(API_KEY);

export const handleMistralChat = async (prompt, history = []) => {
  try {
    const messages = [
      ...history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: prompt }
    ];

    const completion = await client.chat({
      model: 'mistral-large-latest',
      messages,
      temperature: 0.7,
      maxTokens: 1000
    });

    return {
      response: completion.choices[0].message.content,
      status: 'success'
    };
  } catch (error) {
    console.error('Error in Mistral chat:', error);
    return {
      response: 'Error occurred',
      status: 'error',
      error: error.message
    };
  }
};
