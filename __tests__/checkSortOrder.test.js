import { checkSortOrder } from "../src/lib/utils";

describe("checkSortOrder", () => {
  test("function returns a boolean", () => {
    const result = checkSortOrder();

    expect(typeof result).toBe("boolean");
  });

  it("should return true if passed an empty array", () => {
    const result = checkSortOrder([]);

    expect(result).toBe(true);
  });

  test("function checks array and returns true if the fieldNumber property is in ascending order", () => {
    const input = [{ fieldNumber: 1 }, { fieldNumber: 2 }, { fieldNumber: 3 }];
    const result = checkSortOrder(input);

    expect(result).toBe(true);
  });
});
