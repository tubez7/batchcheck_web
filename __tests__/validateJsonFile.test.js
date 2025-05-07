import { validateJsonFile } from "../src/lib/utils";

describe("validateJsonFile()", () => {
  test("function should return a boolean", () => {
    const result = validateJsonFile({});

    expect(typeof result).toBe("boolean");
  });

  test("function will check that argument passed to it is an object and return false if it isn't - primitive data-types", () => {
    const stringResult = validateJsonFile("string");
    const numberResult = validateJsonFile(1);

    expect(stringResult).toBe(false);
    expect(numberResult).toBe(false);
  });

  test("function will check that argument passed to it is an object and return false if it isn't - non-primitive data-type", () => {
    const result = validateJsonFile([]);

    expect(result).toBe(false);
  });

  test("function will check that object passed to it has the correct expected keys", () => {
    const result = validateJsonFile({});

    expect(result).toBe(false);
  });

  test("function will check that object passed to it has the correct expected keys - ADVANCED", () => {
    const object = {};
    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "I AM A FALSE KEY",
    ];
    falseKeys.forEach((key) => {
      object[key] = "";
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that object passed to it has the correct expected keys - MISSING KEY", () => {
    const object = {};
    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
    ];
    falseKeys.forEach((key) => {
      object[key] = "";
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that object passed to it has the correct expected keys - EXTRA KEY", () => {
    const object = {};
    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
      "I AM AN EXTRA KEY",
    ];
    falseKeys.forEach((key) => {
      object[key] = "";
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });
});
