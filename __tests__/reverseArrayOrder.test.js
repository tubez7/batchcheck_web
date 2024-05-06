import { reverseArrayOrder } from "../src/lib/utils";

describe("resetArrayOrder()", () => {
  it("should return an array", () => {
    const input = reverseArrayOrder();
    expect(input).toEqual([]);
  });

  it("should not mutate the input array", () => {
    const input = [];
    const result = reverseArrayOrder(input);
    expect(result).not.toBe(input);
  });

  it("should return an array with same length as input", () => {
    const input = [1, 2, 3];

    expect(reverseArrayOrder(input)).toHaveLength(3);
  });

  it("should return an array in reverse order", () => {
    const input = [1, 2, 3];
    const expected = [3, 2, 1];
    const result = reverseArrayOrder(input);

    expect(result).toEqual(expected);
  });
});
