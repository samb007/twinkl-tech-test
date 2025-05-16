import { render, waitFor, screen } from "@testing-library/react";
import { it, describe, expect, Mock, beforeEach } from "vitest";
import { getPosts } from "./services/json-placeholder-service";
import App from "./App";
import { WrapInReactQuery } from "./test-helpers";

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
});
