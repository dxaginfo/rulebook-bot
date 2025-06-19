const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};