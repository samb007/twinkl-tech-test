import { it, describe, expect } from "vitest";
import { filterPostsByTitle, removeDeletedPosts } from ".";
import { fakePosts } from "../test-helpers";

describe("helpers", () => {
  describe("filterPostsByTitle", () => {
    it("should filter posts based on whether a given string is in the title ", () => {
      const search = "Post 1";

      const result = filterPostsByTitle(fakePosts, search);

      expect(result).toEqual([fakePosts[0]]);
    });

    it("should return an empty array if no posts match the search string", () => {
      const search = "foo";

      const result = filterPostsByTitle(fakePosts, search);

      expect(result).toEqual([]);
    });

    it("should return an empty array if posts are undefined", () => {
      const search = "Post 1";

      const result = filterPostsByTitle(undefined, search);

      expect(result).toEqual([]);
    });

    it("should return all posts if search string is empty", () => {
      const search = "";

      const result = filterPostsByTitle(fakePosts, search);

      expect(result).toEqual(fakePosts);
    });
  });

  describe("removeDeletedPosts", () => {
    it("should remove posts that have been deleted", () => {
      const deletedPostsIds = [1, 2];

      const result = removeDeletedPosts(fakePosts, deletedPostsIds);

      expect(result).toEqual([]);
    });

    it("should return all posts if no posts have been deleted", () => {
      const deletedPostsIds: number[] = [];

      const result = removeDeletedPosts(fakePosts, deletedPostsIds);

      expect(result).toEqual(fakePosts);
    });
  });
});
