import { getPosts, Post } from "../services/json-placeholder-service";
import { it, describe, expect, Mock, beforeEach } from "vitest";
import { Posts } from "./posts.component";
import { render, screen, waitFor } from "@testing-library/react";
import { fakePosts, WrapInReactQuery } from "../test-helpers/index";

vi.mock("../services/json-placeholder-service");

const renderPostsWithQueryClient = (posts: Post[]) => {
  return render(
    <WrapInReactQuery>
      <Posts posts={posts} />
    </WrapInReactQuery>
  );
};

describe("Posts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the posts returned from getPosts function", () => {
    (getPosts as Mock).mockResolvedValue(fakePosts);

    renderPostsWithQueryClient(fakePosts);

    waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Body 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Body 2")).toBeInTheDocument();
    });
  });
});
