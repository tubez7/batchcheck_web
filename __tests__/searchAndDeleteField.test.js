import { searchAndDeleteField } from "../src/lib/utils";

describe("searchAndDeleteField()", () => {
  test("function should return an array", () => {
    const result = searchAndDeleteField();

    expect(result).toEqual([]);
  });

  test("function should return a different array to the one passed to it", () => {
    const input = [];
    const result = searchAndDeleteField(input);

    expect(result).not.toBe(input);
  });

  test("function return an array with the correct field.id removed", () => {
    const input = [
      { name: 1, id: 1 },
      { name: 2, id: 2 },
      { name: 3, id: 3 },
    ];
    const expected = [
      { name: 1, id: 1 },
      { name: 3, id: 3 },
    ];
    const result = searchAndDeleteField(input, 2);

    expect(result).toEqual(expected);
  });

  test("function should not mutate input array", () => {
    const input = [
      { name: 1, id: 1 },
      { name: 2, id: 2 },
      { name: 3, id: 3 },
    ];
    const expected = [
      { name: 1, id: 1 },
      { name: 2, id: 2 },
      { name: 3, id: 3 },
    ];

    searchAndDeleteField(input, 2);
    expect(input).toEqual(expected);
  });

  test("if element does not have an id property it should return the input array without throwing an error", () => {
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

    const result = searchAndDeleteField(input, 1);

    expect(result).toEqual(expected);
  });
});
