import { isEqual } from "lodash-es";
import QRCode from "qrcode";
import json from "./sampleJSON.json";

export const nonWhiteSpaceRegex = /\S/;
export const globalNumericRegex = /\d/g;

export function handleKeyDown(e) {
  const numericOnlyRegex = /\d/;
  const key = e.key;
  const validKeys = [
    "Backspace",
    "Delete",
    "Del",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
  ];

  if (!numericOnlyRegex.test(key) && !validKeys.includes(key)) {
    e.preventDefault();
  }
}

export function raiseArrayElement(array, index) {
  if (!array) return [];

  const arrayClone = [...array];
  if (index > 0 && index < array.length) {
    arrayClone[index - 1] = array[index];
    arrayClone[index] = array[index - 1];
  }
  return arrayClone;
}

export function lowerArrayElement(array, index) {
  if (!array) return [];

  const arrayClone = [...array];
  if (index < array.length - 1) {
    arrayClone[index + 1] = array[index];
    arrayClone[index] = array[index + 1];
  }
  return arrayClone;
}

export function resetArrayOrder(array) {
  if (!array) return [];

  const arrayClone = [...array];
  return arrayClone.sort((a, b) => a.fieldNumber - b.fieldNumber);
}

export function reverseArrayOrder(array) {
  if (!array) return [];

  return array.toReversed();
}

export function compareEquality(value1, value2) {
  const hasExpanded = value1[0]?.hasOwnProperty("expanded");

  if (hasExpanded) {
    const clonedArray1 = value1.map((element) => ({ ...element }));
    const clonedArray2 = value2.map((element) => ({ ...element }));

    clonedArray1.forEach((element) => {
      element.expanded = false;
    });
    clonedArray2.forEach((element) => {
      element.expanded = false;
    });

    return isEqual(clonedArray1, clonedArray2);
  } else {
    return isEqual(value1, value2);
  }
}

export function deleteArrayElement(array, index) {
  if (!array) return [];

  const fieldNumber = array[index]?.fieldNumber;
  const arrayClone = fieldNumber
    ? array.map((element) => ({ ...element }))
    : [...array];

  arrayClone.splice(index, 1);

  arrayClone.forEach((element) => {
    if (fieldNumber && element.fieldNumber > fieldNumber) {
      element.fieldNumber--;
    }
  });

  return arrayClone;
}

export function checkSortOrder(array) {
  if (!array) return true;
  for (let i = 0; i < array.length; i++) {
    if (array[i].fieldNumber > array[i + 1]?.fieldNumber) {
      return false;
    }
  }
  return true;
}

export function setNewSortOrder(array) {
  if (!array) return [];
  const arrayClone = array.map((element) => ({ ...element }));

  arrayClone.forEach((element, i) => {
    if (element.fieldNumber) {
      element.fieldNumber = i + 1;
    }
  });

  return arrayClone;
}

export function filterById(array, id) {
  if (!array) return [];
  return array.filter((element) => element.id !== id);
}

export function filterCompositeData(array, id) {
  if (!array) return [];
  const modifiedArray = array.map((element) => ({ ...element }));

  modifiedArray.forEach((item) => {
    const arrayToFilter = [...item.compositeData];
    item.compositeData = filterById(arrayToFilter, id);
  });

  return modifiedArray;
}

export function amendFieldExpanded(array, index) {
  if (!array) return [];
  const arrayClone = array.map((element) => ({ ...element }));

  arrayClone.forEach((element, i) => {
    if (i === index) {
      element.expanded = !element.expanded;
    } else {
      element.expanded = false;
    }
  });

  return arrayClone;
}

export function getColumnId(number) {
  let returnString = "";
  while (number >= 0) {
    returnString = String.fromCharCode((number % 26) + 65) + returnString;
    number = Math.floor(number / 26) - 1;
  }
  return returnString;
}

export function parseTableColumns(fields) {
  // might need to adapt to set a width property based on column type
  if (!fields) return [];
  return fields.map((element) => {
    const obj = {};
    let type = "";
    obj["title"] = element.name;
    if (element?.type) {
      type = element.type.toUpperCase();
    }
    if (type.includes("QR")) {
      obj.type = "image";
    } else {
      obj.type = "text";
    }
    if (!type.includes("SCAN")) {
      obj.readOnly = true;
    } else {
      obj.readOnly = false;
    }

    return obj;
  });
}

async function iterateThroughRowsAndColumns(rows, fields, callback, ...args) {
  for (let rowNumber = 1; rowNumber <= rows; rowNumber++) {
    for (let fieldsIndex = 0; fieldsIndex < fields.length; fieldsIndex++) {
      await Promise.resolve(
        callback(fields[fieldsIndex], rowNumber, fieldsIndex, ...args)
      );
    }
  }
}

function setCellBackgroundColour(type, darkMode) {
  const lightModeColour = "background-color: White;";
  const darkModeColour = "background-color: #3e3e3e;";
  const defaultColour = darkMode ? darkModeColour : lightModeColour;
  let backgroundColour;

  if (type.includes("SCAN")) {
    backgroundColour = "background-color: rgb(250, 128, 128);";
  } else {
    backgroundColour = defaultColour;
  }

  return backgroundColour;
}

function setCellStyle(field, rowNumber, columnIndex, darkMode, returnObj) {
  const columnId = getColumnId(columnIndex);
  const rowNumberString = rowNumber.toString();
  const fieldType = field.type.toUpperCase();

  returnObj[columnId + rowNumberString] = setCellBackgroundColour(
    fieldType,
    darkMode
  );

  if (fieldType === "SCAN" || fieldType === "COMPOSITE SCAN") {
    returnObj[columnId + rowNumberString] += " color: transparent;";
  } else if (!darkMode) {
    returnObj[columnId + rowNumberString] += " color: black;";
  } else {
    returnObj[columnId + rowNumberString] += " color: white;";
  }
}

export async function createTableStyleObject(rows, fields, darkMode) {
  const objectToReturn = {};
  await iterateThroughRowsAndColumns(
    rows,
    fields,
    setCellStyle,
    darkMode,
    objectToReturn
  );

  return objectToReturn;
}

export function padSerial(startString, leading, character, length) {
  if (leading) {
    return startString.padStart(length, character);
  } else {
    return startString.padEnd(length, character);
  }
}

export function calculateSerialNumber(
  startNumber,
  incrementBy,
  row,
  rowsPerIncrement
) {
  const multiplier = Math.floor((row - 1) / rowsPerIncrement);
  return (startNumber + multiplier * incrementBy).toString();
}

export function createDataFieldCellValue(field, rowNumber) {
  let calculatedValue = "";
  const prefix = field.prefix || "";
  const suffix = field.suffix || "";

  if (field?.hasSerial) {
    const incrementValue = field.incrementValue;
    const recordsPerIncrement = field.recordsPerIncrement;
    const startNumber = field.serial;

    calculatedValue = calculateSerialNumber(
      startNumber,
      incrementValue,
      rowNumber,
      recordsPerIncrement
    );

    if (field?.serialPadded) {
      const padLength = field.padLength;
      const padChar = field.padLead || field.padTrail;
      const padLead = field.padLead ? true : false;

      calculatedValue = padSerial(calculatedValue, padLead, padChar, padLength);
    }
  }

  return prefix + calculatedValue + suffix;
}

export function getUniqueIdNumbers(array) {
  const uniqueIds = [];
  let id;

  array.forEach((item) => {
    id = item.id;
    if (!uniqueIds.includes(id)) {
      uniqueIds.push(id);
    }
  });

  return uniqueIds;
}

export function getUniqueFields(uniqueNumbers, fields) {
  const returnArray = [];
  uniqueNumbers.forEach((number) => {
    returnArray.push(fields.find((field) => field.id === number));
  });

  return returnArray;
}

function createCompositeValue(compositeData, fields, rowNumber, separator) {
  const uniqueIds = getUniqueIdNumbers(compositeData);
  const fieldsList = getUniqueFields(uniqueIds, fields);
  let parsedValue = "";
  let foundField;
  const lastIndex = compositeData.length - 1;
  let appendValue;

  compositeData.forEach((fieldToParse, i) => {
    appendValue = i === lastIndex ? "" : separator;
    foundField = fieldsList.find(
      (uniqueField) => fieldToParse.id === uniqueField.id
    );
    parsedValue +=
      createDataFieldCellValue(foundField, rowNumber) + appendValue;
  });

  return parsedValue;
}

function setCellLookUpData(field, rowNumber, columnIndex, returnObj, fields) {
  let columnId = getColumnId(columnIndex);
  let rowNumberString = rowNumber.toString();
  const type = field.type.toUpperCase();

  if (type === "COMPOSITE SCAN") {
    const separator = field.compositeSeparator;
    const compValue = createCompositeValue(
      field.compositeData,
      fields,
      rowNumber,
      separator
    );
    returnObj[columnId + rowNumberString] = compValue;
  } else if (type.includes("SCAN")) {
    returnObj[columnId + rowNumberString] = createDataFieldCellValue(
      field,
      rowNumber
    );
  }
}

async function getQRUrl(cellValue) {
  const options = {
    errorCorrectionLevel: "M",
    type: "image/webp",
    margin: 1,
  };
  try {
    const url = await QRCode.toDataURL(cellValue, options);
    return url;
  } catch (err) {
    console.error(err);
    return "DEFAULT ERROR QR CODE";
  }
}

// function getQRUrl(cellValue) {
//   // returns a url string that is passed into the values array.
//   return QRCode.toDataURL(cellValue)
//     .then((url) => {
//       console.log("SUCCESS in getQRUrl! url = ", url);
//       return url;
//     })
//     .catch((err) => {
//       console.error(err);
//       return "DEFAULT ERROR QR CODE;";
//     });
// }

export async function createValueMatchDataObject(rows, fields) {
  const objectToReturn = {};
  await iterateThroughRowsAndColumns(
    rows,
    fields,
    setCellLookUpData,
    objectToReturn,
    fields
  );

  return objectToReturn;
}

async function createRowData(
  field,
  rowNumber,
  fieldIndex,
  tableData,
  rowData,
  lastColumnIndex,
  fields
) {
  let clonedArray = [];
  const type = field.type;
  let url;

  // need to build in comp QR
  if (type === "Data") {
    rowData.push(createDataFieldCellValue(field, rowNumber));
  } else if (type === "QR") {
    url = await getQRUrl(createDataFieldCellValue(field, rowNumber));
    rowData.push(url);
  } else if (type === "Composite QR") {
    const separator = field.compositeSeparator;
    url = await getQRUrl(
      createCompositeValue(field.compositeData, fields, rowNumber, separator)
    );
    rowData.push(url);
  } else {
    rowData.push("");
  }

  // push to the parent array at end of the row
  if (fieldIndex === lastColumnIndex) {
    clonedArray = [...rowData];
    tableData.push(clonedArray);
    rowData.length = 0;
  }
}

export async function createTableData(rows, fields) {
  const rowData = [];
  const tableData = [];
  const lastColumnIndex = fields.length - 1;
  await iterateThroughRowsAndColumns(
    rows,
    fields,
    createRowData,
    tableData,
    rowData,
    lastColumnIndex,
    fields
  );
  return tableData;
}

function checkObjectKeys(object, referenceKeys) {
  const checkValues = referenceKeys.sort();
  const keys = Object.keys(object).sort();
  return !isEqual(checkValues, keys);
}

function testTableData(tableDataArray) {
  if (!Array.isArray(tableDataArray)) return true;
  for (let i = 0; i < tableDataArray.length; i++) {
    if (!Array.isArray(tableDataArray[i])) {
      return true;
    }
    for (let j = 0; j < tableDataArray[i].length; j++) {
      if (typeof tableDataArray[i][j] !== "string") {
        return true;
      }
    }
  }
}

function testColumnProperties(column) {
  const {
    title,
    type,
    readOnly,
    name,
    source,
    options,
    editor,
    allowEmpty,
    width,
    align,
  } = column;
  const convertedName = Number(name);
  if (typeof title !== "string") {
    return true;
  }
  if (typeof type !== "string") {
    return true;
  }
  if (typeof readOnly !== "boolean") {
    return true;
  }
  if (typeof name !== "string") {
    return true;
  }
  if (!Number.isInteger(convertedName)) {
    return true;
  }
  if (!Array.isArray(source)) {
    return true;
  }
  if (!Array.isArray(options)) {
    return true;
  }
  if (editor !== null) {
    return true;
  }
  if (typeof allowEmpty !== "boolean") {
    return true;
  }
  if (typeof width !== "number") {
    return true;
  }
  if (typeof align !== "string") {
    return true;
  }
}

function testTableColumns(tableColumnsArray) {
  if (!Array.isArray(tableColumnsArray) || tableColumnsArray.length < 1)
    return true;
  const validColumnKeys = Object.keys(json.columns[0]);
  for (let i = 0; i < tableColumnsArray.length; i++) {
    const element = tableColumnsArray[i];
    if (typeof element !== "object" || Array.isArray(element)) {
      return true;
    }
    if (checkObjectKeys(element, validColumnKeys)) {
      return true;
    }
    if (testColumnProperties(element)) {
      return true;
    }
  }
}

function checkFieldTypes(fieldTypesArray) {
  if (!Array.isArray(fieldTypesArray) || fieldTypesArray.length < 1)
    return true;
  const validFieldTypes = [
    "Data",
    "QR",
    "Scan",
    "Visible data scan",
    "Composite QR",
    "Composite Scan",
  ];
  for (let i = 0; i < fieldTypesArray.length; i++) {
    if (!validFieldTypes.includes(fieldTypesArray[i])) {
      return true;
    }
  }
}

function checkDataObject(object) {
  if (typeof object !== "object" || Array.isArray(object)) {
    return true;
  }
}

function typeCheck(
  name,
  hasSerial,
  serial,
  incrementValue,
  recordsPerIncrement,
  serialPadded,
  padLength,
  padLead,
  padTrail,
  prefix,
  suffix,
  type,
  fieldNumber,
  id,
  compositeData,
  compositeSeparator,
  expanded
) {
  if (typeof name !== "string") {
    return true;
  }
  if (typeof hasSerial !== "boolean") {
    return true;
  }
  if (serial !== null && typeof serial !== "number") {
    return true;
  }
  if (typeof incrementValue !== "number") {
    return true;
  }
  if (typeof recordsPerIncrement !== "number") {
    return true;
  }
  if (typeof serialPadded !== "boolean") {
    return true;
  }
  if (padLength !== null && typeof padLength !== "number") {
    return true;
  }
  if (typeof padLead !== "string") {
    return true;
  }
  if (typeof padTrail !== "string") {
    return true;
  }
  if (typeof prefix !== "string") {
    return true;
  }
  if (typeof suffix !== "string") {
    return true;
  }
  if (typeof type !== "string") {
    return true;
  }
  if (typeof fieldNumber !== "number") {
    return true;
  }
  if (typeof id !== "number") {
    return true;
  }
  if (!Array.isArray(compositeData)) {
    return true;
  }
  if (typeof compositeSeparator !== "string") {
    return true;
  }
  if (typeof expanded !== "boolean") {
    return true;
  }
}

function checkSerialNumberFormat(hasSerial, serial) {
  // continue work here
}

function checkFieldProperties(field) {
  const {
    name,
    hasSerial,
    serial,
    incrementValue,
    recordsPerIncrement,
    serialPadded,
    padLength,
    padLead,
    padTrail,
    prefix,
    suffix,
    type,
    fieldNumber,
    id,
    compositeData,
    compositeSeparator,
    expanded,
  } = field;

  if (
    typeCheck(
      name,
      hasSerial,
      serial,
      incrementValue,
      recordsPerIncrement,
      serialPadded,
      padLength,
      padLead,
      padTrail,
      prefix,
      suffix,
      type,
      fieldNumber,
      id,
      compositeData,
      compositeSeparator,
      expanded
    )
  ) {
    return true;
  }

  if (checkSerialNumberFormat(hasSerial, serial)) {
    // working inside here currently
    return true;
  }
}

function checkFields(fields) {
  if (!Array.isArray(fields) || fields.length < 1) {
    return true;
  }
  const validKeys = Object.keys(json.fields[0]);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (typeof field !== "object" || Array.isArray(field)) {
      return true;
    }
    if (checkObjectKeys(field, validKeys)) {
      return true;
    }
    if (checkFieldProperties(field)) {
      console.log("fields prop failed");
      return true;
    }
  }
}

function checkObjectProperties(object) {
  const {
    tableName,
    tableData,
    columns,
    styleSettings,
    fieldTypes,
    matchValuesData,
    fields,
  } = object;
  if (typeof tableName !== "string") {
    return true;
  }
  if (testTableData(tableData)) {
    return true;
  }
  if (testTableColumns(columns)) {
    return true;
  }
  if (checkDataObject(styleSettings)) {
    return true;
  }
  if (checkFieldTypes(fieldTypes)) {
    return true;
  }
  if (checkDataObject(matchValuesData)) {
    return true;
  }
  if (checkFields(fields)) {
    console.log("failed fields check");
    return true;
  }
  // test fields
  // field id should always be unique. isn't in sample json -> INVESTIGATE.
  // test each field property -> types checked. In depth checking. Next test to pass already written to be passed.
  // test fieldTypes length === columns length === fields length
  // test total rows
}

export function validateJsonFile(jsonObject) {
  const validJsonKeys = [
    "tableData",
    "columns",
    "styleSettings",
    "fieldTypes",
    "matchValuesData",
    "tableName",
    "fields",
    "totalRows",
  ];
  if (typeof jsonObject !== "object" || Array.isArray(jsonObject)) {
    console.log("failed obj check");
    return false;
  } else if (checkObjectKeys(jsonObject, validJsonKeys)) {
    console.log("failed keys check");
    return false;
  } else if (checkObjectProperties(jsonObject)) {
    console.log("failed prop check");
    return false;
  } else {
    return true;
  }
}

export function getUniqueId(array) {
  if (array.length < 1) {
    return 1;
  }
  return Math.max(...array.map(elem => elem.id)) + 1;
}
