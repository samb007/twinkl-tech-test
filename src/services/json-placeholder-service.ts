import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const baseURL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
  try {
    const response = await axios.get<Post[]>(`${baseURL}/posts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete<Post>(`${baseURL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
