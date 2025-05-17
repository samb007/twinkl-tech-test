import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { it, describe, expect, Mock, beforeEach } from "vitest";
import { getPosts } from "./services/json-placeholder-service";
import App from "./App";
import { fakePosts, WrapInReactQuery } from "./test-helpers";

vi.mock("./services/json-placeholder-service");

const renderAppWithQueryClient = () => {
  return render(
    <WrapInReactQuery>
      <App />
    </WrapInReactQuery>
  );
};

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading state when posts are being fetched", () => {
    (getPosts as Mock).mockReturnValue(new Promise(() => {}));

    renderAppWithQueryClient();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error message when there is an error fetching posts", () => {
    (getPosts as Mock).mockRejectedValue(new Error("Network error"));

    renderAppWithQueryClient();

    waitFor(() => {
      expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    });
  });

  it("should display posts when fetched successfully", async () => {
    (getPosts as Mock).mockResolvedValue(fakePosts);

    renderAppWithQueryClient();

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Body 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Body 2")).toBeInTheDocument();
    });
  });

  it("should filter posts by title when the search bar is used", async () => {
    (getPosts as Mock).mockResolvedValue(fakePosts);

    renderAppWithQueryClient();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Post 1" } });

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
    });
  });

  it("should filter out a post when the delete button is clicked", async () => {
    (getPosts as Mock).mockResolvedValue(fakePosts);

    renderAppWithQueryClient();

    await waitFor(() => {
      const firstDeleteButton = screen.getAllByRole("button", {
        name: "Delete post",
      })[0];

      fireEvent.click(firstDeleteButton);
      expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    });
  });
});
