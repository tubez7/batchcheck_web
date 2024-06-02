import { resetArrayOrder } from "../src/lib/utils";

describe("resetArrayOrder()", () => {
  it("should return an array", () => {
    const input = resetArrayOrder();
    expect(input).toEqual([]);
  });

  it("should not return the same input array", () => {
    const input = [];
    const result = resetArrayOrder(input);
    expect(result).not.toBe(input);
  });

  it("should return an array with the same number of elements as the input", () => {
    const input = [1, 2, 3];

    expect(resetArrayOrder(input)).toHaveLength(3);
  });

  it("should sort the array by fieldNumber property", () => {
    const input = [{ fieldNumber: 10 }, { fieldNumber: 1 }, { fieldNumber: 7 }];
    const expected = [
      { fieldNumber: 1 },
      { fieldNumber: 7 },
      { fieldNumber: 10 },
    ];
    const result = resetArrayOrder(input);

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
    resetArrayOrder(input);
    expect(input).toEqual(expected);
  });
});
