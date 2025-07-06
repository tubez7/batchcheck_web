import { getColumnIndex } from "../src/lib/utils";

describe("getColumnIndex()", () => {
  test("should return an integer", () => {
    const result = getColumnIndex("A");
    expect(typeof result).toBe("number");
  });
});
