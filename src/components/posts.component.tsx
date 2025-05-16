import { Post } from "../services/json-placeholder-service";

export const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="mb-4 p-1 border-b border-solid border-gray-700"
          >
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
