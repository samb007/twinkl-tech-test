import { fireEvent, render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { SearchBar } from "./search-bar.component";

describe("SearchBar", () => {
  const mockSetFilter = vi.fn();

  it("should call setFilter function onChange", () => {
    render(<SearchBar setFilter={mockSetFilter} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "foo" } });

    expect(mockSetFilter).toHaveBeenCalled();
    expect(mockSetFilter).toHaveBeenCalledWith("foo");
  });
});
