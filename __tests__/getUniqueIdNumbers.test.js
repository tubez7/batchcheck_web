import { getUniqueIdNumbers } from "../src/lib/utils";

describe("getUniqueIdNumbers()", () => {
  it("should return an array", () => {
    const result = getUniqueIdNumbers([{ id: 1 }]);

    expect(typeof result === "object" && Array.isArray(result)).toBe(true);
  });

  it("should access the id property of every element in the input array to populate the return value", () => {
    const result = getUniqueIdNumbers([{ id: 1 }]);

    expect(result).toEqual([1]);
  });

  test("returned array should only contain unique values", () => {
    const result = getUniqueIdNumbers([{ id: 1 }, { id: 1 }, { id: 1 }]);

    expect(result).toEqual([1]);
  });

  it("should not mutate the original input array", () => {
    const input = [{ id: 1 }, { id: 1 }, { id: 1 }];
    const expected = [{ id: 1 }, { id: 1 }, { id: 1 }];
    getUniqueIdNumbers(input);

    expect(input).toEqual(expected);
  });
});
