import { setTableStyle } from "../src/lib/utils";

describe("setTableStyle()", () => {
  it("should return an object", () => {
    const result = setTableStyle(0, []);

    expect(typeof result === "object" && !Array.isArray(result)).toBe(true);
  });

  it("should set the keys by the number of rows e.g. rows = 3. A1, A2, A3", () => {
    const input = [{ type: "val1" }];
    const expected = { A1: "val1", A2: "val1", A3: "val1" };
    const result = setTableStyle(3, input);

    expect(result).toEqual(expected);
  });

  it("should set the keys by the index of the input array e.g. 0 = A, 1 = B, 26 = AA.", () => {
    const input = [{ type: "val1" }, { type: "val2" }, { type: "val3" }];
    const expected = { A1: "val1", B1: "val2", C1: "val3" };
    const result = setTableStyle(1, input);

    expect(result).toEqual(expected);
  });
});
