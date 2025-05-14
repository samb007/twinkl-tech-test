import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./components/posts.component";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col w-full md:w-2/3">
          <h1>Hello Twinkl!</h1>
          <Posts />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
