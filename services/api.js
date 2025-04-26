export const getRecommendations = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  };