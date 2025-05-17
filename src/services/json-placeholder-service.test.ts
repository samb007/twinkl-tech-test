import { it, describe, expect, Mock } from "vitest";
import axios from "axios";
import { fakePosts } from "../test-helpers";
import { deletePost } from "./json-placeholder-service";
const { getPosts } = await import("./json-placeholder-service");

vi.mock("axios", async () => {
  return { default: { get: vi.fn(), delete: vi.fn() } };
});

const fakePostData = {
  data: fakePosts,
};

describe("service", () => {
  describe("getPosts", () => {
    it("should return posts", async () => {
      (axios.get as Mock).mockReturnValue(fakePostData);

      const posts = await getPosts();

      expect(posts).toEqual(fakePostData.data);
    });

    it("should handle errors", async () => {
      (axios.get as Mock).mockImplementation(() => {
        throw new Error("Network error");
      });

      await expect(getPosts()).rejects.toThrow("Network error");
    });
  });

  describe("deletePost", () => {
    const fakeDeletePostData = { data: fakePosts[0] };

    it("should delete a post", async () => {
      (axios.delete as Mock).mockReturnValue(fakeDeletePostData);

      const response = await deletePost(1);

      expect(response).toEqual(fakePosts[0]);
    });

    it("should handle errors", async () => {
      (axios.delete as Mock).mockImplementation(() => {
        throw new Error("Network error");
      });

      await expect(deletePost(1)).rejects.toThrow("Network error");
    });
  });
});
