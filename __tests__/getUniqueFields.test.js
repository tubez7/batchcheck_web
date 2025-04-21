import { getUniqueFields } from "../src/lib/utils";

describe("getUniqueFields()", () => {
  it("should return an array", () => {
    const result = getUniqueFields([1], [{ id: 1 }]);

    expect(typeof result === "object" && Array.isArray(result)).toBe(true);
  });

  it("should pass the field object to the returned array is the id matches the values in the reference array", () => {
    const result = getUniqueFields([1], [{ id: 1 }]);

    expect(result).toEqual([{ id: 1 }]);
  });

  it("should only pass unique field object to the returned array is the id matches the values in the reference array", () => {
    const result = getUniqueFields([1], [{ id: 1 }, { id: 1 }]);

    expect(result).toEqual([{ id: 1 }]);
  });

  it("should not mutate any of the arrays passed to it", () => {
    const input1 = [1, 2, 4];
    const expected1 = [1, 2, 4];
    const input2 = [{ id: 1 }, { id: 2 }];
    const expected2 = [{ id: 1 }, { id: 2 }];

    getUniqueFields(input1, input2);

    expect(input1).toEqual(expected1);
    expect(input2).toEqual(expected2);
  });
});
