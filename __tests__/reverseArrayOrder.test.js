import { reverseArrayOrder } from "../src/lib/utils";

describe("resetArrayOrder()", () => {
  it("should return an array", () => {
    const input = reverseArrayOrder();
    expect(input).toEqual([]);
  });

  it("should not return the same input array", () => {
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
    reverseArrayOrder(input);
    expect(input).toEqual(expected);
  });
});
