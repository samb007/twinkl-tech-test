import { Post } from "../services/json-placeholder-service";

export const filterPostsByTitle = (
  posts: Post[] | undefined,
  search: string
) => {
  if (!posts) return [];
  return posts.filter((post) => post.title.includes(search));
};
