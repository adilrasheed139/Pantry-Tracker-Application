const API_KEY = 'd48a154764de41a5ba06801cf8b56570';
const BASE_URL = 'https://api.spoonacular.com';

export const getRecipes = async (ingredients) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${API_KEY}`);
    const data = await response.json();
    return data; // Adjust based on the actual API response format
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; // Ensure it returns an empty array on error
  }
};
