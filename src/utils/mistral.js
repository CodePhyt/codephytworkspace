const API_KEY = 'jAgzpFJSfh4YAdGaDIoHEKxeLZIVjUZw';

export const handleMistralChat = async (prompt, history = []) => {
  try {
    const { default: MistralClient } = await import('@mistralai/mistralai');
    const client = new MistralClient(API_KEY);

    const messages = [
      ...history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: prompt }
    ];

    const completion = await client.chat({
      model: 'mistral-small',  // Using smaller, more efficient model
      messages,
      temperature: 0.7,
      maxTokens: 1000,
      topP: 0.95,
      safeMode: false
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
