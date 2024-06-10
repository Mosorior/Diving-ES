
const BASE_URL = '${process.env.REACT_APP_API_URL}/api/posts';

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
