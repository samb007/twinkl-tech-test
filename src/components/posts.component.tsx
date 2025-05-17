import { Post } from "../services/json-placeholder-service";

interface PostsProps {
  posts: Post[];
  deletedPostsIds: number[];
  setDeletedPostsIds: (ids: number[]) => void;
}

export const Posts = ({
  posts,
  deletedPostsIds,
  setDeletedPostsIds,
}: PostsProps) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <div
            className="flex flex-row justify-between items-center border-b border-solid border-gray-700"
            key={post.id}
          >
            <li className="mb-4 mr-4 p-1 ">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
            <button
              className=" h-1/2 bg-red-500 text-white p-2 rounded cursor-pointer"
              onClick={() => {
                setDeletedPostsIds([...deletedPostsIds, post.id]);
              }}
            >
              Delete post
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
