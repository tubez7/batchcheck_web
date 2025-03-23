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

  test("testing with non composite field types", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "QR", prefix: "Four" },
      { type: "Visible data scan", prefix: "Five" },
    ];
    const expected = {
      A1: "One",
      C1: "Three",
      E1: "Five",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  test("testing with composite field types", () => {
    const input = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Data", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      { type: "QR", prefix: "Four", id: 4 },
      { type: "Visible data scan", prefix: "Five", id: 5 },
      {
        type: "Composite Scan",
        id: 6,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "",
      },
    ];
    const expected = {
      A1: "One",
      C1: "Three",
      E1: "Five",
      F1: "OneTwoThree",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  test("testing with composite field types with separators", () => {
    const input = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Data", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      { type: "QR", prefix: "Four", id: 4 },
      { type: "Visible data scan", prefix: "Five", id: 5 },
      {
        type: "Composite Scan",
        id: 6,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "||",
      },
    ];
    const expected = {
      A1: "One",
      C1: "Three",
      E1: "Five",
      F1: "One||Two||Three",
    };
    const result = createValueMatchDataObject(1, input);

    expect(result).toEqual(expected);
  });

  it("should not mutate the input array", () => {
    const input = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Data", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      { type: "QR", prefix: "Four", id: 4 },
      { type: "Visible data scan", prefix: "Five", id: 5 },
      {
        type: "Composite Scan",
        id: 6,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "",
      },
    ];

    const expected = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Data", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      { type: "QR", prefix: "Four", id: 4 },
      { type: "Visible data scan", prefix: "Five", id: 5 },
      {
        type: "Composite Scan",
        id: 6,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "",
      },
    ];

    createValueMatchDataObject(1, input);

    expect(input).toEqual(expected);
  });
});
