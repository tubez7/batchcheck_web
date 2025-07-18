import { createTableData } from "../src/lib/utils";

describe("createTableData()", () => {
  it("should return an array", async () => {
    const result = await createTableData(1, []);

    expect(typeof result === "object" && Array.isArray(result)).toBe(true);
  });

  it("should populate the array with calculated values of the fields passed to it when type is data", async () => {
    const input = [
      { type: "Data", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Data", prefix: "Three" },
    ];
    const expected = [["One", "Two", "Three"]];
    const result = await createTableData(1, input);

    expect(result).toEqual(expected);
  });

  it("should pass an empty string into the array if the field type is a scan field", async () => {
    const input = [
      { type: "Scan", prefix: "One" },
      { type: "Data", prefix: "Two" },
      { type: "Scan", prefix: "Three" },
      { type: "Visible Data Scan", prefix: "Four" },
    ];
    const expected = [["", "Two", "", ""]];
    const result = await createTableData(1, input);

    expect(result).toEqual(expected);
  });

  it("should pass a QR url into the array if the field type is a scan field", async () => {
    const input = [{ type: "QR", prefix: "Four" }];
    const result = await createTableData(1, input);

    expect(result[0][0].startsWith("data:image/png;base64")).toBe(true);
  });

  it("should not mutate the input array", async () => {
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

    await createTableData(1, input);

    expect(input).toEqual(expected);
  });
});
