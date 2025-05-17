import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const baseURL = "https://jsonplaceholder.typicode.com";

// I would have liked to filter the posts by title in the getPosts function by passing in a query string to the URL
// but the filtering on the API side uses exact matches
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
    const response = await axios.delete<{}>(`${baseURL}/posts/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
