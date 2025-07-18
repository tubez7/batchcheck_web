import { isEqual } from "lodash-es";
import QRCode from "qrcode";
import json from "./sampleJSON.json";
import validData from "./validDataTemplates.json";

export const nonWhiteSpaceRegex = /\S/;
export const globalNumericRegex = /\d/g;

export function handleKeyDown(e) {
  const numericOnlyRegex = /\d/;
  const key = e.key;
  const validKeys = validData.validKeys;

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
    margin: 4, // default 4 - quiet zone - test
    //width: 40, //set widths in pixels - test
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

function checkFieldTypes(fieldTypesArray, fields) {
  if (!Array.isArray(fieldTypesArray) || fieldTypesArray.length < 1)
    return true;

  const validFieldTypes = validData.fieldTypes;
  for (let i = 0; i < fieldTypesArray.length; i++) {
    if (!validFieldTypes.includes(fieldTypesArray[i])) {
      return true;
    }
    if (fieldTypesArray[i] !== fields[i]?.type) {
      return true;
    }
  }
}

export function getColumnIndex(columnString) {
  let result = 0;
  let letterValue = "";
  for (let i = 0; i < columnString.length; i++) {
    letterValue = columnString.charCodeAt(i) - 65;
    result = result * 26 + (letterValue + 1);
  }
  return result - 1;
}

function checkMatchValuesData(object, fields, totalRows) {
  const validKeyRegex = /^[A-Z]+[0-9]+$/;
  let keyToCheck;
  let columnId;
  let char;
  let indexToCheck;
  let fieldType;
  let rowId;

  for (const key in object) {
    keyToCheck = `${key}`;
    if (!validKeyRegex.test(keyToCheck)) {
      return true;
    }
    if (typeof object[key] !== "string") {
      return true;
    }

    columnId = "";
    rowId = "";
    for (let j = 0; j < keyToCheck.length; j++) {
      char = keyToCheck[j];
      if (char >= "A" && char <= "Z") {
        columnId += char;
      } else {
        break;
      }
    }
    indexToCheck = getColumnIndex(columnId);
    fieldType = fields[indexToCheck]?.type;
    if (fieldType && !fieldType.includes("Scan")) {
      return true;
    }

    for (let j = keyToCheck.length - 1; j >= 0; j--) {
      char = keyToCheck[j];
      if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
        rowId = char + rowId;
      } else {
        break;
      }
    }
    if (rowId > totalRows) {
      return true;
    }
  }
}

function checkDataObject(object, callback, ...args) {
  if (typeof object !== "object" || Array.isArray(object)) {
    return true;
  }
  if (callback) {
    if (callback(object, ...args)) {
      return true;
    }
  }
}

function typeCheck(
  name,
  hasSerial,
  incrementValue,
  recordsPerIncrement,
  serialPadded,
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
  if (typeof incrementValue !== "number") {
    return true;
  }
  if (typeof recordsPerIncrement !== "number") {
    return true;
  }
  if (typeof serialPadded !== "boolean") {
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
  if (hasSerial) {
    if (typeof serial !== "number") {
      return true;
    }
  } else {
    if (serial !== null) {
      return true;
    }
  }
}

function checkPadFormat(padded, length, serial, hasSerial, lead, trail) {
  if (padded) {
    const leadLength = lead.length;
    const trailLength = trail.length;
    if (!hasSerial) {
      return true;
    }
    const minPadLength = serial.toString().length;
    if (typeof length !== "number") {
      return true;
    }
    if (length < minPadLength) {
      return true;
    }
    if (leadLength > 0 && trailLength > 0) {
      return true;
    }
    if (leadLength !== 1 && trailLength !== 1) {
      return true;
    }
  } else {
    if (length !== null) {
      return true;
    }
  }
}

function checkValidValue(validValues, value) {
  if (!validValues.includes(value)) {
    return true;
  }
}

function checkFieldNumber(number, maximum, indexReference) {
  if (number > maximum || number !== indexReference + 1) {
    return true;
  }
}

function checkCompData(array, validIds, fields) {
  const validCompDataKeys = Object.keys(validData.compositeData);
  const compDataLength = array.length;
  for (let i = 0; i < compDataLength; i++) {
    const dataObject = array[i];
    if (checkObjectKeys(dataObject, validCompDataKeys)) {
      return true;
    }
    const fieldNumber = dataObject.fieldNumber;
    if (checkFieldNumber(fieldNumber, compDataLength, i)) {
      return true;
    }
    const idToCheck = dataObject.id;
    if (!validIds.includes(idToCheck)) {
      return true;
    }
    const fieldToCheck = fields.find((field) => field.id === idToCheck);
    if (fieldToCheck.type.includes("Composite")) {
      return true;
    }
  }
}

function checkFieldProperties(field, fieldsLength, ids, fields, index) {
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

  const validTypes = validData.fieldTypes;

  if (
    typeCheck(
      name,
      hasSerial,
      incrementValue,
      recordsPerIncrement,
      serialPadded,
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
    return true;
  }
  if (
    checkPadFormat(
      serialPadded,
      padLength,
      serial,
      hasSerial,
      padLead,
      padTrail
    )
  ) {
    return true;
  }
  if (checkValidValue(validTypes, type)) {
    return true;
  }
  if (checkFieldNumber(fieldNumber, fieldsLength, index)) {
    return true;
  }
  if (checkCompData(compositeData, ids, fields)) {
    return true;
  }
}

function checkFields(fields) {
  const length = fields.length;
  if (!Array.isArray(fields) || length < 1) {
    return true;
  }
  const uniqueIds = getUniqueIdNumbers(fields);
  if (uniqueIds.length !== length) {
    return true;
  }

  const validKeys = Object.keys(json.fields[0]);
  for (let i = 0; i < length; i++) {
    const field = fields[i];

    if (checkDataObject(field)) {
      return true;
    }
    if (checkObjectKeys(field, validKeys)) {
      return true;
    }
    if (checkFieldProperties(field, length, uniqueIds, fields, i)) {
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
    totalRows,
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
  if (checkFieldTypes(fieldTypes, fields)) {
    return true;
  }
  if (
    checkDataObject(matchValuesData, checkMatchValuesData, fields, totalRows)
  ) {
    return true;
  }
  if (checkFields(fields)) {
    return true;
  }
  if (
    columns.length !== fieldTypes.length ||
    fieldTypes.length !== fields.length
  ) {
    return true;
  }
  if (totalRows !== tableData.length) {
    return true;
  }
}

export function validateJsonFile(jsonObject) {
  const validJsonKeys = Object.keys(json);
  if (checkDataObject(jsonObject)) {
    return false;
  } else if (checkObjectKeys(jsonObject, validJsonKeys)) {
    return false;
  } else if (checkObjectProperties(jsonObject)) {
    return false;
  } else {
    return true;
  }
}

export function getUniqueId(array) {
  if (array.length < 1) {
    return 1;
  }
  return Math.max(...array.map((elem) => elem.id)) + 1;
}
