import { getPosts } from "@/services/json-placeholder-service";
import { useQuery } from "@tanstack/react-query";

export const Posts = () => {
  const query = useQuery({ queryKey: ["todos"], queryFn: getPosts });
  return (
    <div>
      {query.isLoading && <p>Loading...</p>}
      {query.isError && <p>Error: {query.error.message}</p>}
      {query.isSuccess && (
        <ul>
          {query.data.map((post) => (
            <li
              key={post.id}
              className="mb-4 p-1 border-b border-solid border-gray-700"
            >
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
