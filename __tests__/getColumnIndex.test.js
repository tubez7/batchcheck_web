import { getColumnIndex } from "../src/lib/utils";

describe("getColumnIndex()", () => {
  test("should return an integer", () => {
    const result = getColumnIndex("A");
    expect(typeof result).toBe("number");
  });
  test("should return 0 when passed A", () => {
    const result = getColumnIndex("A");
    expect(result).toBe(0);
  });
  test("should return 25 when passed Z", () => {
    const result = getColumnIndex("Z");
    expect(result).toBe(25);
  });
  test("should return 26 when passed AA", () => {
    const result = getColumnIndex("AA");
    expect(result).toBe(26);
  });
  test("should return 53 when passed BB", () => {
    const result = getColumnIndex("BB");
    expect(result).toBe(53);
  });
});
