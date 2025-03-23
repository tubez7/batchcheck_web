import { calculateSerialNumber } from "../src/lib/utils";

describe("calculateSerialNumber()", () => {
  it("should return a string value", () => {
    const result = calculateSerialNumber(1, 0, 1, 1);

    expect(typeof result === "string").toBe(true);
  });

  it("should return the starting number if the increment value is 0", () => {
    const result = calculateSerialNumber(1, 0, 1, 1);

    expect(result).toBe("1");
  });

  it("should return the starting number incremented by the increment value on the 2nd row if rows per increment value is 1", () => {
    const row = 2;
    const rowsPerIncrement = 1;
    const result = calculateSerialNumber(1, 1, row, rowsPerIncrement);

    expect(result).toBe("2");
  });

  it("should not return the starting number incremented by the increment value on the 2nd row if rows per increment value is 2", () => {
    const row = 2;
    const rowsPerIncrement = 2;
    const result = calculateSerialNumber(1, 1, row, rowsPerIncrement);

    expect(result).toBe("1");
  });

  test("using larger row numbers", () => {
    const row = 1;
    const rowsPerIncrement = 25;
    const result = calculateSerialNumber(1, 1, row, rowsPerIncrement);

    const row2 = 25;
    const result2 = calculateSerialNumber(1, 1, row2, rowsPerIncrement);

    const row3 = 26;
    const result3 = calculateSerialNumber(1, 1, row3, rowsPerIncrement);

    const row4 = 51;
    const result4 = calculateSerialNumber(1, 1, row4, rowsPerIncrement);

    expect(result).toBe("1");
    expect(result2).toBe("1");
    expect(result3).toBe("2");
    expect(result4).toBe("3");
  });
});
