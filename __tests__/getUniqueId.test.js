import { getUniqueId } from "../src/lib/utils";

describe("getUniqueId()", () => {
  test("returns the number 1 when passed an empty array ", () => {
    const result = getUniqueId([]);

    expect(result).toBe(1);
  });

  test("returns a number 1 higher than the highest existing object's id property within the input array", () => {
    const input = [
      { name: "field1", id: 1 },
      { name: "field2", id: 3 },
      { name: "field3", id: 5 },
    ];
    const result = getUniqueId(input);

    expect(result).toBe(6);
  });

  test("function should not mutate the input array", () => {
    const input = [
      { name: "field1", id: 1 },
      { name: "field2", id: 3 },
      { name: "field3", id: 5 },
    ];
    getUniqueId(input);
    const expected = [
      { name: "field1", id: 1 },
      { name: "field2", id: 3 },
      { name: "field3", id: 5 },
    ];

    expect(input).toEqual(expected);
  });
});
