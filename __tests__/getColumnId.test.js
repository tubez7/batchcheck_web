import { getColumnId } from "../src/lib/utils";

describe("getColumnId()", () => {
  it("should return a string", () => {
    const result = getColumnId([]);

    expect(typeof result === "string").toBe(true);
  });
});
