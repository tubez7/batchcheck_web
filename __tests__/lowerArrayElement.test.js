import { lowerArrayElement } from "../src/lib/utils";

describe("lowerArrayElement()", () => {
  it("should return an array", () => {
    const input = lowerArrayElement();
    expect(input).toEqual([]);
  });

  it("should not return the same input array", () => {
    const input = [];
    const result = lowerArrayElement(input);
    expect(result).not.toBe(input);
  });

  it("should return an array with the same number of elements as the input array", () => {
    const input = [1, 2, 3];
    const result = lowerArrayElement(input);
    expect(result).toHaveLength(3);
  });

  it("should lower the element at the targeted index by 1 position", () => {
    const input = [1, 3, 2];
    const expected = [1, 2, 3];
    const result = lowerArrayElement(input, 1);
    expect(result).toEqual(expected);
  });

  it("should not lower the element at last index", () => {
    const input = [1, 2, 3];
    const result = lowerArrayElement(input, 2);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return an identical array to the input if the index is greater than the size of the input array", () => {
    const input = [1, 2, 3];
    const result = lowerArrayElement(input, 20);
    expect(result).toStrictEqual([1, 2, 3]);
  });

  it("should not mutate the input array", () => {
    const input = [
      { index: 0, fieldNumber: 1 },
      { index: 1, fieldNumber: 2 },
      { index: 2, fieldNumber: 3 },
      { index: 3, fieldNumber: 4 },
      { index: 4, fieldNumber: 5 },
    ];
    const expected = [
      { index: 0, fieldNumber: 1 },
      { index: 1, fieldNumber: 2 },
      { index: 2, fieldNumber: 3 },
      { index: 3, fieldNumber: 4 },
      { index: 4, fieldNumber: 5 },
    ];
    lowerArrayElement(input, 0);
    expect(input).toEqual(expected);
  });
});
