import { cloneDeep } from "lodash-es";
import json from "../src/lib/sampleJSON.json";
import { validateJsonFile } from "../src/lib/utils";
import validData from "../src/lib/validDataTemplates.json";

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
    const object4 = {};

    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "tableName") {
        object1[key] = 0;
        object2[key] = [];
        object3[key] = {};
        object4[key] = true;
      } else {
        object1[key] = json[key];
        object2[key] = json[key];
        object3[key] = json[key];
        object4[key] = json[key];
      }
    });

    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);
    const result3 = validateJsonFile(object3);
    const result4 = validateJsonFile(object4);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  test("function will test that the tableData property value is an array and return false if it isn't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "tableData") {
        object1[key] = 0;
        object2[key] = "";
        object3[key] = {};
      } else {
        object1[key] = json[key];
        object2[key] = json[key];
        object3[key] = json[key];
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
    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "tableData") {
        object[key] = tableData;
      } else {
        object[key] = json[key];
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
    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "tableData") {
        object[key] = tableData;
      } else {
        object[key] = json[key];
      }
    });
    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test that the columns property value is an array and return false if it isn't", () => {
    const object1 = {};
    const object2 = {};
    const object3 = {};

    const keys = Object.keys(json);
    keys.forEach((key) => {
      if (key === "columns") {
        object1[key] = "string";
        object2[key] = 0;
        object3[key] = {};
      } else {
        object1[key] = json[key];
        object2[key] = json[key];
        object3[key] = json[key];
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

    const keys = Object.keys(json);
    keys.forEach((key) => {
      if (key === "columns") {
        object1[key] = columns1;
        object2[key] = columns2;
        object3[key] = columns3;
      } else {
        object1[key] = json[key];
        object2[key] = json[key];
        object3[key] = json[key];
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
    const keys = Object.keys(json);
    const columns = [];
    const validColumnKeys = Object.keys(json.columns[0]);
    const keysMissingKey = [
      "title",
      "type",
      "readOnly",
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
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test all the properties of the column data objects match expected values and will return false if they don't - EXTRA KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const validColumnKeys = Object.keys(json.columns[0]);
    const keysExtraKey = [
      "title",
      "type",
      "readOnly",
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
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will test all the properties of the column data objects match expected values and will return false if they don't - WRONG KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const validColumnKeys = Object.keys(json.columns[0]);
    const keysWrongKey = [
      "title",
      "type",
      "readOnly",
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
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the title property of the column data object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};

    const columnKeys = Object.keys(json.columns[0]);

    columnKeys.forEach((key) => {
      columnObject[key] = null;
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the type property of the column data object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "type") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the readOnly property of the column data object is a boolean", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "readOnly") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the name property of the column data object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "name") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the name property of the column data object is a string that is also an integer", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "name") {
        columnObject[key] = "name";
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the source property of the column data object is an array", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "source") {
        columnObject[key] = {};
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the options property of the column data object is an array", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "options") {
        columnObject[key] = {};
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the editor property of the column data object is null", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "editor") {
        columnObject[key] = undefined;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the allowEmpty property of the column data object is a boolean", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "allowEmpty") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the width property of the column data object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "width") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the align property of the column data object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const columns = [];
    const columnObject = {};
    const column = json.columns[0];
    const columnKeys = Object.keys(column);

    columnKeys.forEach((key) => {
      if (key === "align") {
        columnObject[key] = null;
      } else {
        columnObject[key] = column[key];
      }
    });

    columns.push(columnObject);

    keys.forEach((key) => {
      if (key === "columns") {
        object[key] = columns;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the styleSettings property of the JSON data object is an object", () => {
    const object = {};
    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "styleSettings") {
        object[key] = [];
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the fieldTypes property of the JSON data object is an array", () => {
    const object = {};
    const keys = Object.keys(json);
    keys.forEach((key) => {
      if (key === "fieldTypes") {
        object[key] = {};
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the contents of the fieldTypes array of the JSON data object match the expected values", () => {
    const object1 = {};
    const object2 = {};
    const keys = Object.keys(json);

    keys.forEach((key) => {
      if (key === "fieldTypes") {
        object1[key] = [];
        object2[key] = ["Data", "FALSE VALUE"];
      } else {
        object1[key] = json[key];
        object2[key] = json[key];
      }
    });

    const result1 = validateJsonFile(object1);
    const result2 = validateJsonFile(object2);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  test("function will check that the matchValuesData property of the JSON data object is an object", () => {
    const object = {};
    const keys = Object.keys(json);
    keys.forEach((key) => {
      if (key === "matchValuesData") {
        object[key] = [];
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that the fields property of the JSON data object is an array", () => {
    const object = {};
    const keys = Object.keys(json);
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = {};
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that every element in the fields array is an object", () => {
    const object = {};
    const keys = Object.keys(json);
    const fields = [{}, {}, [], {}];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that fields array has a length of at least 1", () => {
    const object = {};
    const keys = Object.keys(json);
    const fields = [];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that all field objects match expected properties - MISSING KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "TEXT FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "MY TEXT",
      suffix: "FIELD",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that all field objects match expected properties - EXTRA KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "TEXT FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "MY TEXT",
      suffix: "FIELD",
      "EXTRA-KEY": null,
      type: "Data",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that all field objects match expected properties - WRONG KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "TEXT FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "MY TEXT",
      WRONG: "FIELD",
      type: "Data",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that name property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: 0,
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that hasSerial property of field object is a boolean", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: null,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that serial property of field object is a number or null", () => {
    const object = {};
    const object2 = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: "null",
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const invalidField2 = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: "1",
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    const fields2 = [validField, invalidField2];

    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
        object2[key] = fields2;
      } else {
        object[key] = json[key];
        object2[key] = json[key];
      }
    });

    const result = validateJsonFile(object);
    const result2 = validateJsonFile(object2);

    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  test("function will check that incrementValue property of field object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: "0",
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that recordsPerIncrement property of field object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: "1",
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that serialPadded property of field object is a boolean", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: "false",
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that padLength property of field object is either a number or null", () => {
    const object = {};
    const object2 = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: undefined,
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 1,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const invalidField2 = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: "1",
      padLead: "",
      padTrail: "",
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    const fields2 = [validField, invalidField2];

    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
        object2[key] = fields2;
      } else {
        object[key] = json[key];
        object2[key] = json[key];
      }
    });

    const result = validateJsonFile(object);
    const result2 = validateJsonFile(object2);

    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  test("function will check that padTrail property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: 1,
      prefix: "SCAN",
      suffix: "CHECK",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that prefix property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: undefined,
      suffix: "undefined",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that suffix property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "undefined",
      suffix: undefined,
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that type property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: undefined,
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that fieldNumber property of field object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: "2",
      id: 2,
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that id property of field object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: "2",
      compositeData: [],
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that compositeData property of field object is an array", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: {},
      compositeSeparator: "",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that compositeSeparator property of field object is a string", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: undefined,
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that expanded property of field object is a boolean", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: undefined,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if hasSerial = true, serial property of field object is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if hasSerial = false, serial property of field object is null", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, property value of padLength is a number", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = false, property value of padLength is null", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: 0,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of padLength is not smaller than the minimum pad length", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 10,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 1,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of hasSerial is true", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 3,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of only padLead or only padTrail is a single character", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 3,
      padLead: "1",
      padTrail: "1",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of only padLead or only padTrail is a single character - TEST 2", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 3,
      padLead: "10",
      padTrail: "10",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of only padLead or only padTrail is a single character - TEST 3", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 3,
      padLead: "10",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that if serialPadded = true, value of only padLead or only padTrail is a single character - TEST 4", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: true,
      padLength: 3,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Visible Data Scan",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that field type property is a valid type", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "I AM WRONG",
      fieldNumber: 2,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that field number is not a bigger number than the total length of fields array", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Data",
      fieldNumber: 6,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that all field ID numbers are unique", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Data",
      fieldNumber: 2,
      id: 1,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that fieldNumber is correct in relation to the index", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validField2 = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Data",
      fieldNumber: 3,
      id: 3,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const invalidField = {
      name: "FIELD NAME",
      hasSerial: true,
      serial: 1,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Data",
      fieldNumber: 3,
      id: 2,
      compositeData: [],
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField, validField2];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields keys match the expected values - TEST EXTRA KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "name",
      id: 1,
      fieldNumber: 1,
      extra: "I AM AN EXTRA KEY",
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields keys match the expected values - TEST MISSING KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "name",
      id: 1,
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields keys match the expected values - TEST INCORRECT KEY", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "name",
      id: 1,
      number: 1,
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields id property exists in fields array object", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "FIELD NAME",
      id: 7,
      fieldNumber: 2,
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields id property is not a Composite Data field in fields array object", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "FIELD NAME",
      id: 2,
      fieldNumber: 2,
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that Composite Data fields array fieldNumbers match the correct index", () => {
    const object = {};
    const keys = Object.keys(json);
    const validField = json.fields[0];
    const validCompDataField = validData.compositeData;
    const invalidCompDataField = {
      name: "FIELD NAME",
      id: 1,
      fieldNumber: 3,
    };
    const compDataArray = [validCompDataField, invalidCompDataField];
    const invalidField = {
      name: "COMPOSITE DATA FIELD",
      hasSerial: false,
      serial: null,
      incrementValue: 0,
      recordsPerIncrement: 1,
      serialPadded: false,
      padLength: null,
      padLead: "",
      padTrail: "",
      prefix: "",
      suffix: "",
      type: "Composite QR",
      fieldNumber: 2,
      id: 2,
      compositeData: compDataArray,
      compositeSeparator: "||",
      expanded: false,
    };
    const fields = [validField, invalidField];
    keys.forEach((key) => {
      if (key === "fields") {
        object[key] = fields;
      } else {
        object[key] = json[key];
      }
    });

    const result = validateJsonFile(object);

    expect(result).toBe(false);
  });

  test("function will check that fieldTypes elements match the fields type property at the corresponding fields array index", () => {
    const invalidJson = cloneDeep(json);
    const fieldTypes = ["Data", "Data"];
    invalidJson.fieldTypes = fieldTypes;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that fieldTypes length, columns length, and fields length all match - TEST INVALID COLUMNS", () => {
    const invalidJson = cloneDeep(json);
    const columns = [
      {
        title: "TEXT FIELD",
        type: "text",
        readOnly: true,
        name: "0",
        source: [],
        options: [],
        editor: null,
        allowEmpty: false,
        width: 50,
        align: "center",
      },
    ];
    invalidJson.columns = columns;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that fieldTypes length, columns length, and fields length all match - TEST INVALID fieldTypes", () => {
    const invalidJson = cloneDeep(json);
    const fieldTypes = ["Data"];
    invalidJson.fieldTypes = fieldTypes;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that fieldTypes length, columns length, and fields length all match - TEST INVALID fields", () => {
    const invalidJson = cloneDeep(json);
    const fields = [
      {
        name: "TEXT FIELD",
        hasSerial: false,
        serial: null,
        incrementValue: 0,
        recordsPerIncrement: 1,
        serialPadded: false,
        padLength: null,
        padLead: "",
        padTrail: "",
        prefix: "MY TEXT",
        suffix: "FIELD",
        type: "Data",
        fieldNumber: 1,
        id: 1,
        compositeData: [],
        compositeSeparator: "",
        expanded: false,
      },
    ];
    invalidJson.fields = fields;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that tableData length matches the totalRows property", () => {
    const invalidJson = cloneDeep(json);
    const tableData = [
      ["MY TEXTFIELD", "SCAN CHECK"],
      ["MY TEXTFIELD", "SCANCHECK"],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
      ["MY TEXTFIELD", ""],
    ];
    invalidJson.tableData = tableData;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that the keys of the matchValuesData object match the columns of a Scan type field", () => {
    const invalidJson = cloneDeep(json);
    const matchValuesData = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "SCANCHECK",
      B7: "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      A10: "SCANCHECK",
    };
    invalidJson.matchValuesData = matchValuesData;

    const result = validateJsonFile(invalidJson);

    expect(result).toBe(false);
  });

  test("function will check that the properties of the matchValuesData object are strings", () => {
    const invalidJson = cloneDeep(json);
    const matchValuesData = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: 1,
      B7: "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson.matchValuesData = matchValuesData;

    const result = validateJsonFile(invalidJson);
    expect(result).toBe(false);
  });

  test("function will check that the key format of the matchValuesData object keys are valid", () => {
    const invalidJson = cloneDeep(json);
    const matchValuesData = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "1",
      "7B": "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson.matchValuesData = matchValuesData;

    const result = validateJsonFile(invalidJson);
    expect(result).toBe(false);

    const invalidJson2 = cloneDeep(json);
    const matchValuesData2 = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "1",
      b7: "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson2.matchValuesData = matchValuesData2;

    const result2 = validateJsonFile(invalidJson2);
    expect(result2).toBe(false);

    const invalidJson3 = cloneDeep(json);
    const matchValuesData3 = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "1",
      B7B: "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson3.matchValuesData = matchValuesData3;

    const result3 = validateJsonFile(invalidJson3);
    expect(result3).toBe(false);

    const invalidJson4 = cloneDeep(json);
    const matchValuesData4 = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "1",
      "!B7": "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson4.matchValuesData = matchValuesData4;

    const result4 = validateJsonFile(invalidJson4);

    expect(result4).toBe(false);

    const invalidJson5 = cloneDeep(json);
    const matchValuesData5 = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "1",
      "B7 ": "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
    };
    invalidJson5.matchValuesData = matchValuesData5;

    const result5 = validateJsonFile(invalidJson5);
    expect(result5).toBe(false);
  });

  test("function will check that the cell value numbers of the matchValuesData keys are not greater than the total rows", () => {
    const invalidJson = cloneDeep(json);
    const matchValuesData = {
      B1: "SCANCHECK",
      B2: "SCANCHECK",
      B3: "SCANCHECK",
      B4: "SCANCHECK",
      B5: "SCANCHECK",
      B6: "SCANCHECK",
      B7: "SCANCHECK",
      B8: "SCANCHECK",
      B9: "SCANCHECK",
      B10: "SCANCHECK",
      B11: "SCANCHECK",
    };
    invalidJson.matchValuesData = matchValuesData;

    const result = validateJsonFile(invalidJson);
    expect(result).toBe(false);
  });

  test("function will return true for a validated file", () => {
    const validJson = cloneDeep(json);

    const result = validateJsonFile(validJson);
    expect(result).toBe(true);
  });
});
