import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await api.post('/posts', {
      title: post.title,
      body: post.body,
      userId: post.userId || 1,  //|| 1Serve para simular o id do posts criado
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};

export const updatePost = async (postId, updatedPost) => {
  try {
    const response = await api.put(`/posts/${postId}`, {
      ...updatedPost,
      userId: updatedPost.userId || 1,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw error;
  }
};

export default api;