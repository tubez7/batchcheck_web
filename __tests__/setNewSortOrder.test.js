import { setNewSortOrder } from "../src/lib/utils";

describe("setNewSortOrder()", () => {
  test("function should return an array", () => {
    const result = setNewSortOrder();

    expect(result).toEqual([]);
  });

  test("function should return array with same length as input", () => {
    const input = [1, 2, 3, 4];
    const result = setNewSortOrder(input);

    expect(result).toHaveLength(4);
  });

  test("function should return a different array from input", () => {
    const input = [1, 2, 3, 4];
    const result = setNewSortOrder(input);

    expect(result).not.toBe(input);
  });

  test("function should return an array of objects with fieldNumber property in same ascending order as the object's index", () => {
    const input = [
      { name: 1, fieldNumber: 3 },
      { name: 2, fieldNumber: 4 },
      { name: 3, fieldNumber: 1 },
      { name: 4, fieldNumber: 2 },
    ];
    const result = setNewSortOrder(input);
    const expected = [
      { name: 1, fieldNumber: 1 },
      { name: 2, fieldNumber: 2 },
      { name: 3, fieldNumber: 3 },
      { name: 4, fieldNumber: 4 },
    ];

    expect(result).toEqual(expected);
  });

  test("function should not mutate input array", () => {
    const input = [
      { name: 1, fieldNumber: 3 },
      { name: 2, fieldNumber: 4 },
      { name: 3, fieldNumber: 1 },
      { name: 4, fieldNumber: 2 },
    ];
    const expected = [
      { name: 1, fieldNumber: 3 },
      { name: 2, fieldNumber: 4 },
      { name: 3, fieldNumber: 1 },
      { name: 4, fieldNumber: 2 },
    ];

    setNewSortOrder(input);

    expect(input).toEqual(expected);
  });
});
