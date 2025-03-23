import { createDataFieldCellValue } from "../src/lib/utils";

describe("createDataFieldCellValue()", () => {
  test("function should return a string", () => {
    const result = createDataFieldCellValue({}, 1);

    expect(typeof result === "string").toBe(true);
  });

  test("if object passed to it has a prefix property, this value should begin the string returned", () => {
    const input = "PRE";
    const result = createDataFieldCellValue({ prefix: input }, 1);

    expect(result.startsWith(input)).toBe(true);
  });

  test("if object passed to it has a suffix property, this value should end the string returned", () => {
    const input = "SUF";
    const result = createDataFieldCellValue({ suffix: input }, 1);

    expect(result.endsWith(input)).toBe(true);
  });

  test("if object passed to it has a serial number, this value should be calculated by the row number and incrementValue", () => {
    const field = {
      hasSerial: true,
      serial: 100,
      incrementValue: 50,
      recordsPerIncrement: 1,
    };
    const result = createDataFieldCellValue(field, 1);
    const result2 = createDataFieldCellValue(field, 2);

    expect(result).toBe("100");
    expect(result2).toBe("150");
  });

  test("if object passed to it has a serial number, this value should be modified by the recordsPerIncrement value", () => {
    const field = {
      hasSerial: true,
      serial: 100,
      incrementValue: 50,
      recordsPerIncrement: 3,
    };
    const result = createDataFieldCellValue(field, 2);
    const result2 = createDataFieldCellValue(field, 3);
    const result3 = createDataFieldCellValue(field, 4);
    const result4 = createDataFieldCellValue(field, 6);
    const result5 = createDataFieldCellValue(field, 7);

    expect(result).toBe("100");
    expect(result2).toBe("100");
    expect(result3).toBe("150");
    expect(result4).toBe("150");
    expect(result5).toBe("200");
  });

  test("if object passed to it has a serial number and is padded, this value should be modified by the padLead value", () => {
    const field = {
      hasSerial: true,
      serial: 100,
      incrementValue: 50,
      recordsPerIncrement: 3,
      serialPadded: true,
      padLead: "0",
      padLength: 6,
    };
    const result = createDataFieldCellValue(field, 4);

    expect(result).toBe("000150");
  });

  test("if object passed to it has a serial number and is padded, this value should be modified by the padTrail value", () => {
    const field = {
      hasSerial: true,
      serial: 100,
      incrementValue: 50,
      recordsPerIncrement: 3,
      serialPadded: true,
      padTrail: "X",
      padLength: 6,
    };
    const result = createDataFieldCellValue(field, 4);

    expect(result).toBe("150XXX");
  });
});
