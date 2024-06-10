const BASE_URL = '${process.env.REACT_APP_API_URL}/api/posts'; // Reemplaza con la URL base de tu API

export const getPostById = async (postId) => {
  const response = await fetch(`${BASE_URL}/${postId}`);
  const data = await response.json();
  return data;
};

export const getPosts = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};