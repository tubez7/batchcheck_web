import { raiseArrayElement } from "../src/lib/utils";

describe("raiseArrayElement()", () => {
  it("should return an array", () => {
    const input = raiseArrayElement();
    expect(input).toBeInstanceOf(Array);
  });

  it("should not mutate the input array", () => {
    const input = [];
    const result = raiseArrayElement(input);
    expect(result).not.toBe(input);
  });

  it("should return an array with the same number of elements as the input array", () => {
    const input = [1, 2, 3];
    const result = raiseArrayElement(input);
    expect(result).toHaveLength(3);
  });

  it("should raise the element at the targeted index by 1 position", () => {
    const input = [2, 1, 3];
    const expected = [1, 2, 3];
    const result = raiseArrayElement(input, 1);
    expect(result).toEqual(expected);
  });

  it("should not raise the element at 0 index", () => {
    const input = [1, 2, 3];
    const result = raiseArrayElement(input, 0);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should return an identical array to the input if the index is greater than the size of the input array", () => {
    const input = [1, 2, 3];
    const result = raiseArrayElement(input, 20);
    expect(result).toStrictEqual([1, 2, 3]);
  });
});
