import { it, describe, expect, beforeEach } from "vitest";
import { Posts } from "./posts.component";
import { render, screen, waitFor } from "@testing-library/react";
import { fakePosts } from "../test-helpers/index";

const mockSetDeletedPostsIds = vi.fn();

describe("Posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the posts returned from getPosts function", () => {
    render(
      <Posts
        posts={fakePosts}
        deletedPostsIds={[]}
        setDeletedPostsIds={mockSetDeletedPostsIds}
      />
    );

    waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Body 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Body 2")).toBeInTheDocument();
    });
  });

  it("should call setDeletedPostIds prop when the delete post button is clicked", () => {
    render(
      <Posts
        posts={fakePosts}
        deletedPostsIds={[]}
        setDeletedPostsIds={mockSetDeletedPostsIds}
      />
    );

    const firstDeleteButton = screen.getAllByRole("button", {
      name: "Delete post",
    })[0];

    firstDeleteButton.click();

    expect(mockSetDeletedPostsIds).toHaveBeenCalled();
    expect(mockSetDeletedPostsIds).toHaveBeenCalledWith([1]);
  });
});
