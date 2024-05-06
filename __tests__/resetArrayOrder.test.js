import { resetArrayOrder } from "../src/lib/utils";

describe("resetArrayOrder()", () => {
  it("should return an array", () => {
    const input = resetArrayOrder();
    expect(input).toEqual([]);
  });

  it("should not mutate the input array", () => {
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
});
