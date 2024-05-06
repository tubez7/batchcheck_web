import { compareEquality } from "../src/lib/utils";

describe("Testing behaviour of lodash isEqual()", () => {
  test("should return true for simple array equality", () => {
    const test1 = [1, 2, 3];
    const test2 = [1, 2, 3];
    const result = compareEquality(test1, test2);

    expect(result).toBe(true);
  });

  test("should return true for simple array equality", () => {
    const test1 = [1, 2, 3];
    const test2 = [3, 2, 1];
    const result = compareEquality(test1, test2);

    expect(result).toBe(false);
  });
});
