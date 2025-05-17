import { deletePost } from "@/services/json-placeholder-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// This hook is used to delete a post and invalidate the posts query
// unfortunately it can't be used in this example because json placeholder
// doesn't actually delete the post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const queryDeletePost = async (id: number) => {
    const data = await deletePost(id);

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    return data;
  };

  return useMutation({
    mutationFn: queryDeletePost,
  });
};
