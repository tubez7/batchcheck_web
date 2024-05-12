import { deleteArrayElement } from "../src/lib/utils";

describe("deleteArrayElement()", () => {
  test("function should return an array", () => {
    const result = deleteArrayElement();

    expect(result).toEqual([]);
  });

  it("should return a different array from the one passed as an argument", () => {
    const input = [];
    const result = deleteArrayElement(input);
    expect(result).not.toBe(input);
  });

  it("should return an array with the element at the specified index removed", () => {
    const input = [1, 2, 3, 4, 5];
    const result = deleteArrayElement(input, 2);
    const expected = [1, 2, 4, 5];

    expect(result).toEqual(expected);
  });

  it("should not mutate the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const value = [1, 2, 3, 4, 5];
    deleteArrayElement(input, 2);

    expect(input).toEqual(value);
  });

  it("should decrease the fieldNumber property of all elements below it in the array order by 1", () => {
    const input = [
      { index: 0, fieldNumber: 1 },
      { index: 1, fieldNumber: 2 },
      { index: 2, fieldNumber: 3 },
      { index: 3, fieldNumber: 4 },
      { index: 4, fieldNumber: 5 },
    ];
    const result = deleteArrayElement(input, 2);
    const expected = [
      { index: 0, fieldNumber: 1 },
      { index: 1, fieldNumber: 2 },
      { index: 3, fieldNumber: 3 },
      { index: 4, fieldNumber: 4 },
    ];

    expect(result).toEqual(expected);
  });
});
