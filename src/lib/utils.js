import { isEqual } from "lodash-es";

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
      type = element.type;
    }
    if (type.includes("QR")) {
      obj.type = "image";
    } else if (type === "Scan" || type === "Composite Scan") {
      obj.type = "color"; // this might need to be text - set min width in style
    } else {
      obj.type = "text";
    }
    return obj;
  });
}

function iterateThroughRowsAndColumns(rows, fields, callback, ...args) {
  for (let rowNumber = 1; rowNumber <= rows; rowNumber++) {
    for (let fieldsIndex = 0; fieldsIndex < fields.length; fieldsIndex++) {
      callback(fields[fieldsIndex], rowNumber, fieldsIndex, ...args);
    }
  }
}

function setCellBackgroundColour(type, darkMode) {
  const lightModeColour = "background-color: White";
  const darkModeColour = "background-color: #3e3e3e";
  const defaultColour = darkMode ? darkModeColour : lightModeColour;
  let backgroundColour;

  if (type.includes("SCAN")) {
    backgroundColour = "background-color: rgb(250, 128, 128)";
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

  // append additional styles here
  // e.g. - returnObj[columnId + rowNumberString] += ; font-weight: bolder;
}

export function createTableStyleObject(rows, fields, darkMode) {
  const objectToReturn = {};
  iterateThroughRowsAndColumns(
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

function setCellLookUpData(field, rowNumber, columnIndex, returnObj) {
  let columnId = getColumnId(columnIndex);
  let rowNumberString = rowNumber.toString();
  let typeString;

  typeString = field.type.toUpperCase();
  if (typeString.includes("SCAN")) {
    returnObj[columnId + rowNumberString] = createDataFieldCellValue(
      field,
      rowNumber
    );
  }
}

export function createValueMatchDataObject(rows, fields) {
  const objectToReturn = {};
  iterateThroughRowsAndColumns(rows, fields, setCellLookUpData, objectToReturn);

  return objectToReturn;
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
    parsedValue += createDataFieldCellValue(foundField, rowNumber) + appendValue;
  });

  return parsedValue;
}

function createRowData(
  field,
  rowNumber,
  fieldIndex,
  tableData,
  rowData,
  lastColumnIndex,
  fields
) {
  let clonedArray = [];
  let type = field.type;
  if (type === "Data") {
    rowData.push(createDataFieldCellValue(field, rowNumber));
  } else if (type === "Composite Scan") {
    const separator = field.compositeSeparator;
    const compositeValue = createCompositeValue(field.compositeData, fields, rowNumber, separator);
    rowData.push(compositeValue);
  } else {
    rowData.push("");
  }

  if (fieldIndex === lastColumnIndex) {
    clonedArray = [...rowData];
    tableData.push(clonedArray);
    rowData.length = 0;
  }
}

export function createTableData(rows, fields) {
  const rowData = [];
  const tableData = [];
  const lastColumnIndex = fields.length - 1;
  iterateThroughRowsAndColumns(
    rows,
    fields,
    createRowData,
    tableData,
    rowData,
    lastColumnIndex,
    fields
  );

  console.log("returned value = ", tableData);
  return tableData;
}
