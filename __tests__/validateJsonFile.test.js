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

    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = 0;
      } else {
        object1[key] = "";
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object2[key] = [];
      } else {
        object2[key] = "";
      }
    });

    keys.forEach((key) => {
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

    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
      if (key === "tableData") {
        object1[key] = 0;
      } else {
        object1[key] = "";
      }
    });

    keys.forEach((key) => {
      object2[key] = "";
    });

    keys.forEach((key) => {
      if (key === "tableData") {
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
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
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
      ["", ""],
      ["string", []],
      ["string", ""],
    ];
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
      if (key === "tableData") {
        object[key] = tableData;
      } else {
        object[key] = "";
      }
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test that the columns property value is an array and return false if it isn't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = "name";
      } else if (key === "tableData") {
        object1[key] = [[""]];
      } else if (key === "columns") {
        object1[key] = "string";
      } else {
        object1[key] = null;
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object2[key] = "name";
      } else if (key === "tableData") {
        object2[key] = [[""]];
      } else if (key === "columns") {
        object2[key] = 0;
      } else {
        object2[key] = null;
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object3[key] = "name";
      } else if (key === "tableData") {
        object3[key] = [[""]];
      } else if (key === "columns") {
        object3[key] = {};
      } else {
        object3[key] = null;
      }
    });
    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);
    const result3 = validateJsonFile(object3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  test("function will test that all the elements in the columns array are objects and return false if they aren't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const columns1 = [{}, "", {}];
    const columns2 = [[], {}, {}];
    const columns3 = [{}, {}, 0];

    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    keys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = "name";
      } else if (key === "tableData") {
        object1[key] = [[""]];
      } else if (key === "columns") {
        object1[key] = columns1;
      } else {
        object1[key] = null;
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object2[key] = "name";
      } else if (key === "tableData") {
        object2[key] = [[""]];
      } else if (key === "columns") {
        object2[key] = columns2;
      } else {
        object2[key] = null;
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object3[key] = "name";
      } else if (key === "tableData") {
        object3[key] = [[""]];
      } else if (key === "columns") {
        object3[key] = columns3;
      } else {
        object3[key] = null;
      }
    });
    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);
    const result3 = validateJsonFile(object3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  test("function will test all the properties of the column data objects match expected values and will return false if they don't - MISSING KEY", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const validColumnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];
    const keysMissingKey = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "allowEmpty",
      "width",
      "align",
    ];

    const validColumnObject = {};
    const invalidColumnObject = {};

    keysMissingKey.forEach((key) => {
      invalidColumnObject[key] = null;
    });

    validColumnKeys.forEach((key) => {
      validColumnObject[key] = null;
    });

    columns.push(validColumnObject, invalidColumnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test all the properties of the column data objects match expected values and will return false if they don't - EXTRA KEY", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const validColumnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];
    const keysExtraKey = [
      "title",
      "type",
      "name",
      "I AM AN EXTRA KEY",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    const validColumnObject = {};
    const invalidColumnObject = {};

    keysExtraKey.forEach((key) => {
      invalidColumnObject[key] = null;
    });

    validColumnKeys.forEach((key) => {
      validColumnObject[key] = null;
    });

    columns.push(
      validColumnObject,
      validColumnObject,
      invalidColumnObject,
      validColumnObject
    );

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test all the properties of the column data objects match expected values and will return false if they don't - WRONG KEY", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const validColumnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];
    const keysWrongKey = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "I AM WRONG",
      "align",
    ];

    const validColumnObject = {};
    const invalidColumnObject = {};

    keysWrongKey.forEach((key) => {
      invalidColumnObject[key] = null;
    });

    validColumnKeys.forEach((key) => {
      validColumnObject[key] = null;
    });

    columns.push(
      invalidColumnObject,
      validColumnObject,
      validColumnObject,
      validColumnObject
    );

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the title property of the column data object is a string", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      columnObject[key] = null;
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the type property of the column data object is a string", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the name property of the column data object is a string", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the name property of the column data object is a string that is also an integer", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "name";
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the source property of the column data object is an array", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the source property of the column data object is an array", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the options property of the column data object is an array", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else if (key === "source") {
        columnObject[key] = [];
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the editor property of the column data object is null", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else if (key === "source") {
        columnObject[key] = [];
      } else if (key === "options") {
        columnObject[key] = [];
      } else if (key === "editor") {
        columnObject[key] = undefined;
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the allowEmpty property of the column data object is a boolean", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else if (key === "source") {
        columnObject[key] = [];
      } else if (key === "options") {
        columnObject[key] = [];
      } else if (key === "editor") {
        columnObject[key] = null;
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the width property of the column data object is a number", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else if (key === "source") {
        columnObject[key] = [];
      } else if (key === "options") {
        columnObject[key] = [];
      } else if (key === "editor") {
        columnObject[key] = null;
      } else if (key === "allowEmpty") {
        columnObject[key] = false;
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the align property of the column data object is a string", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    const columnKeys = [
      "title",
      "type",
      "name",
      "source",
      "options",
      "editor",
      "allowEmpty",
      "width",
      "align",
    ];

    columnKeys.forEach((key) => {
      if (key === "title") {
        columnObject[key] = "title";
      } else if (key === "type") {
        columnObject[key] = "type";
      } else if (key === "name") {
        columnObject[key] = "1";
      } else if (key === "source") {
        columnObject[key] = [];
      } else if (key === "options") {
        columnObject[key] = [];
      } else if (key === "editor") {
        columnObject[key] = null;
      } else if (key === "allowEmpty") {
        columnObject[key] = false;
      } else if (key === "width") {
        columnObject[key] = 50;
      } else {
        columnObject[key] = null;
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the styleSettings property of the JSON data object is an object", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};

    columnObject.title = "title";
    columnObject.type = "type";
    columnObject.name = "1";
    columnObject.source = [];
    columnObject.options = [];
    columnObject.editor = null;
    columnObject.allowEmpty = false;
    columnObject.width = 50;
    columnObject.align = "center";

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else if (key === "styleSettings") {
        object[key] = [];
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the fieldTypes property of the JSON data object is an array", () => {
    const object = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};

    columnObject.title = "title";
    columnObject.type = "type";
    columnObject.name = "1";
    columnObject.source = [];
    columnObject.options = [];
    columnObject.editor = null;
    columnObject.allowEmpty = false;
    columnObject.width = 50;
    columnObject.align = "center";

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object[key] = "name";
      } else if (key === "tableData") {
        object[key] = [[""]];
      } else if (key === "columns") {
        object[key] = columns;
      } else if (key === "styleSettings") {
        object[key] = {};
      } else if (key === "fieldTypes") {
        object[key] = {};
      } else {
        object[key] = null;
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the contents of the fieldTypes array of the JSON data object match the expected values", () => {
    const object1 = {};
    const object2 = {};
    const keys = [
      "tableData",
      "columns",
      "styleSettings",
      "fieldTypes",
      "matchValuesData",
      "tableName",
      "fields",
      "totalRows",
    ];
    const columns = [];
    const columnObject = {};
    columnObject.title = "title";
    columnObject.type = "type";
    columnObject.name = "1";
    columnObject.source = [];
    columnObject.options = [];
    columnObject.editor = null;
    columnObject.allowEmpty = false;
    columnObject.width = 50;
    columnObject.align = "center";
    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = "name";
      } else if (key === "tableData") {
        object1[key] = [[""]];
      } else if (key === "columns") {
        object1[key] = columns;
      } else if (key === "styleSettings") {
        object1[key] = {};
      } else if (key === "fieldTypes") {
        object1[key] = [];
      } else {
        object1[key] = null;
      }
    });

    keys.forEach((key) => {
      if (key === "tableName") {
        object2[key] = "name";
      } else if (key === "tableData") {
        object2[key] = [[""]];
      } else if (key === "columns") {
        object2[key] = columns;
      } else if (key === "styleSettings") {
        object2[key] = {};
      } else if (key === "fieldTypes") {
        object2[key] = ["Data", "FALSE VALUE"];
      } else {
        object2[key] = null;
      }
    });

    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});
