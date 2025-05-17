import "./app.css";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Posts } from "./components/posts.component";
import { getPosts } from "./services/json-placeholder-service";
import { SearchBar } from "./components/search-bar.component";
import { filterPostsByTitle, removeDeletedPosts } from "./helpers";

const App = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [deletedPostsIds, setDeletedPostsIds] = useState<number[]>([]);
  const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  // Filtering posts on the client side to mimic an api that actually updates data.
  // In a real world scenario, you would want to use a mutation to delete or filter the posts
  const filteredPosts = useMemo(() => {
    const filteredPostsByTitle = filterPostsByTitle(query.data, titleFilter);
    const posts = removeDeletedPosts(filteredPostsByTitle, deletedPostsIds);
    return posts;
  }, [query.data, titleFilter, deletedPostsIds]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 p-2">
        <SearchBar setFilter={setTitleFilter} />
        {query.isLoading && <p>Loading...</p>}
        {query.isError && <p>Error: {query.error.message}</p>}

        {query.isSuccess && (
          <Posts
            posts={filteredPosts}
            deletedPostsIds={deletedPostsIds}
            setDeletedPostsIds={setDeletedPostsIds}
          />
        )}
      </div>
    </div>
  );
};

export default App;
