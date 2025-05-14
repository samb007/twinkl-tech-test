import { it, describe, expect, Mock } from "vitest";
import axios from "axios";
import { fakePosts } from "@/test-helpers";
const { getPosts } = await import("./json-placeholder-service");

vi.mock("axios", async () => {
  return { default: { get: vi.fn() } };
});

const fakePostData = {
  data: fakePosts,
};

describe("service", () => {
  describe("getPosts", () => {
    it("should return posts", async () => {
      (axios.get as Mock).mockReturnValue(fakePostData);

      const posts = await getPosts();

      expect(posts).toEqual([
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
        { userId: 2, id: 2, title: "Post 2", body: "Body 2" },
      ]);
    });

    it("should handle errors", async () => {
      (axios.get as Mock).mockImplementation(() => {
        throw new Error("Network error");
      });

      await expect(getPosts()).rejects.toThrow("Network error");
    });
  });
});
