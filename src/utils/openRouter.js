const API_KEY = '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';

export const handleOpenRouterChat = async (prompt, history = []) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://codephyt.com',
        'X-Title': 'Arif AI Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-opus',
        messages: [
          ...history.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.choices[0].message.content,
      status: 'success'
    };
  } catch (error) {
    console.error('Error in OpenRouter chat:', error);
    return {
      response: 'Error occurred',
      status: 'error',
      error: error.message
    };
  }
};
