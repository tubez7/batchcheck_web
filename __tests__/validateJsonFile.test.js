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

  test("function will test that the tableName property value is a string and return false if it isn't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    falseKeys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = 0;
      } else {
        object1[key] = "";
      }
    });

    falseKeys.forEach((key) => {
      if (key === "tableName") {
        object2[key] = [];
      } else {
        object2[key] = "";
      }
    });

    falseKeys.forEach((key) => {
      if (key === "tableName") {
        object3[key] = {};
      } else {
        object3[key] = "";
      }
    });
    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);
    const result3 = validateJsonFile(object3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  test("function will test that the tableData property value is an array and return false if it isn't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    falseKeys.forEach((key) => {
      if (key === "tableData") {
        object1[key] = 0;
      } else {
        object1[key] = "";
      }
    });

    falseKeys.forEach((key) => {
      if (key === "tableData") {
        object2[key] = "";
      }
    });

    falseKeys.forEach((key) => {
      if (key === "tableName") {
        object3[key] = {};
      } else {
        object3[key] = "";
      }
    });
    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);
    const result3 = validateJsonFile(object3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  test("function will test that the tableData array contains only sub-arrays", () => {
    const object = {};
    const tableData = [["sub-array"], [1], "string"];
    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    falseKeys.forEach((key) => {
      if (key === "tableData") {
        object[key] = tableData;
      } else {
        object[key] = "";
      }
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test that the tableData array sub-arrays contain string values only", () => {
    const object = {};
    const tableData = [
      ["", "sub-array"],
      ["string", []],
      ["string", ""],
    ];
    const falseKeys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    falseKeys.forEach((key) => {
      if (key === "tableData") {
        object[key] = tableData;
      } else {
        object[key] = "";
      }
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });
});
