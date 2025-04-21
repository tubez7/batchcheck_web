import { createTableStyleObject } from "../src/lib/utils";

describe("createTableStyleObject()", () => {
  it("should return an object", async () => {
    const result = await createTableStyleObject(0, [], false);

    expect(typeof result === "object" && !Array.isArray(result)).toBe(true);
  });

  it("should set the keys by the number of rows e.g. rows = 3. A1, A2, A3", async () => {
    const input = [{ type: "val1" }];
    const expected = {
      A1: "background-color: White",
      A2: "background-color: White",
      A3: "background-color: White",
    };
    const result = await createTableStyleObject(3, input, false);

    expect(result).toEqual(expected);
  });

  it("should set the keys by the index of the input array e.g. 0 = A, 1 = B, 26 = AA.",async () => {
    const input = [{ type: "val1" }, { type: "val2" }, { type: "val3" }];
    const expected = {
      A1: "background-color: White",
      B1: "background-color: White",
      C1: "background-color: White",
    };
    const result = await createTableStyleObject(1, input, false);

    expect(result).toEqual(expected);
  });

  it("should set the default background colour of the cell to #3e3e3e, when dark mode is set to true", async () => {
    const input = [{ type: "val1" }, { type: "val2" }, { type: "val3" }];
    const expected = {
      A1: "background-color: #3e3e3e",
      B1: "background-color: #3e3e3e",
      C1: "background-color: #3e3e3e",
    };
    const result = await createTableStyleObject(1, input, true);

    expect(result).toEqual(expected);
  });

  it("should set the background colour of the cell to #rgb(250, 128, 128), object type property is a scan type", async () => {
    const input = [
      { type: "Visible data scan" },
      { type: "Scan" },
      { type: "Composite Scan" },
    ];
    const expected = {
      A1: "background-color: rgb(250, 128, 128)",
      B1: "background-color: rgb(250, 128, 128)",
      C1: "background-color: rgb(250, 128, 128)",
    };
    const result = await createTableStyleObject(1, input, false);

    expect(result).toEqual(expected);
  });

  test("testing assorted field type values", async () => {
    const input = [{ type: "Data" }, { type: "Scan" }, { type: "QR" }];

    const expected = {
      A1: "background-color: White",
      B1: "background-color: rgb(250, 128, 128)",
      C1: "background-color: White",
    };
    const result = await createTableStyleObject(1, input, false);

    expect(result).toEqual(expected);
  });

  test("it should not mutate the input", async () => {
    const input = [{ type: "Data" }, { type: "Scan" }, { type: "QR" }];

    const expected = [{ type: "Data" }, { type: "Scan" }, { type: "QR" }];
    await createTableStyleObject(1, input, false);

    expect(input).toEqual(expected);
  });
});
