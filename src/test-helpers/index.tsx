import { Post } from "@/services/json-placeholder-service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const fakePosts: Post[] = [
  { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
  { userId: 2, id: 2, title: "Post 2", body: "Body 2" },
];

export const WrapInReactQuery = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
