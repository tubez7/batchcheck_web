import { createTableData } from "../src/lib/utils";

describe("createTableData()", () => {
  it("should return an array", () => {
    const result = createTableData(1, []);

    expect(typeof result === "object" && Array.isArray(result)).toBe(true);
  });

  it("should populate the array with calculated values of the fields passed to it when type is data", () => {
    const input = [
      { type: "Data", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Data", prefix: "Three" },
    ];
    const expected = [["One", "Two", "Three"]];
    const result = createTableData(1, input);

    expect(result).toEqual(expected);
  });

  it("should pass an empty string into the array if the field type is a scan field", () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "Visible data scan", prefix: "Four" },
    ];
    const expected = [["", "Two", "", ""]];
    const result = createTableData(1, input);

    expect(result).toEqual(expected);
  });

  it("should not mutate the input array", () => {
    const input = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Scan", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      {
        type: "Composite Scan",
        id: 4,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "||",
      },
    ];

    const expected = [
      { type: "Scan", prefix: "One", id: 1 },
      { type: "Scan", prefix: "Two", id: 2 },
      { type: "Scan", prefix: "Three", id: 3 },
      {
        type: "Composite Scan",
        id: 4,
        compositeData: [{ id: 1 }, { id: 2 }, { id: 3 }],
        compositeSeparator: "||",
      },
    ];

    createTableData(1, input);

    expect(input).toEqual(expected);
  });
});
