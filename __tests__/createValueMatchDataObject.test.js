import { createValueMatchDataObject } from "../src/lib/utils";

describe("createValueLookUpData()", () => {
  test("function returns an instance of an object", () => {
    const result = createValueMatchDataObject(1, []);

    expect(typeof result === "object" && Array.isArray(result)).toBe(false);
  });

  it("should set the keys by the number of rows e.g. rows = 3. A1, A2, A3", () => {
    const input = [{ type: "Scan" }];
    const expected = {
      A1: "",
      A2: "",
      A3: "",
    };
    const result = createValueMatchDataObject(3, input);

    expect(result).toEqual(expected);
  });

  it("should set the keys by the index of the input array e.g. 0 = A, 1 = B, 26 = AA.", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Scan", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
    ];
    const expected = {
      A1: "One",
      B1: "Two",
      C1: "Three",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  it("should skip assigning any values for any fields that aren't of a scan type", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
    ];
    const expected = {
      A1: "One",
      C1: "Three",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  test("testing with all field types", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "QR", prefix: "Four" },
      { type: "Visible data scan", prefix: "Five" },
      { type: "Composite QR", prefix: "Six" },
      { type: "Composite Scan", prefix: "Seven" },
    ];
    const expected = {
      A1: "One",
      C1: "Three",
      E1: "Five",
      G1: "Seven",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  it("should not mutate the input array", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "QR", prefix: "Four" },
      { type: "Visible data scan", prefix: "Five" },
      { type: "Composite QR", prefix: "Six" },
      { type: "Composite Scan", prefix: "Seven" },
    ];

    const expected = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "QR", prefix: "Four" },
      { type: "Visible data scan", prefix: "Five" },
      { type: "Composite QR", prefix: "Six" },
      { type: "Composite Scan", prefix: "Seven" },
    ];

    createValueMatchDataObject(1, input);

    expect(input).toEqual(expected);
  });
});
