import "./app.css";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Posts } from "./components/posts.component";
import { getPosts } from "./services/json-placeholder-service";
import { SearchBar } from "./components/search-bar.component";
import { filterPostsByTitle } from "./helpers";

const App = () => {
  const [filter, setFilter] = useState("");
  const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  const filteredPosts = useMemo(() => {
    return filterPostsByTitle(query.data, filter);
  }, [query.data, filter]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 p-2">
        <SearchBar setFilter={setFilter} />
        {query.isLoading && <p>Loading...</p>}
        {query.isError && <p>Error: {query.error.message}</p>}

        {query.isSuccess && <Posts posts={filteredPosts} />}
      </div>
    </div>
  );
};

export default App;
