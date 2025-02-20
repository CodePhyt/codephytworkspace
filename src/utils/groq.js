import { Groq } from 'groq-sdk';

const API_KEY = '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';

const groq = new Groq({
  apiKey: API_KEY
});

export const handleGroqChat = async (prompt, history = []) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        ...history.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: prompt }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.95,
      stream: false
    });

    return {
      response: completion.choices[0].message.content,
      status: 'success'
    };
  } catch (error) {
    console.error('Error in Groq chat:', error);
    return {
      response: 'Error occurred',
      status: 'error',
      error: error.message
    };
  }
};
