
const BASE_URL = 'http://localhost:3001/api/posts';

export const getCommentsByPostId = async (postId) => {
  const response = await fetch(`${BASE_URL}/${postId}/comments`);
  const data = await response.json();
  return data;
};

export const addComment = async (postId, comment) => {
  const response = await fetch(`${BASE_URL}/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });
  const data = await response.json();
  return data;
};
