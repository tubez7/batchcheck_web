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

export function parseTableColumns(array) {
  if (!array) return [];
  return array.map((element) => {
    const obj = {};
    let type = "";
    obj["title"] = element.name;
    if (element?.type) {
      type = element.type;
    }
    if (type.includes("QR")) {
      obj.type = "image";
    } else if (type === "Scan" || type === "Composite Scan") {
      obj.type = "color";
    } else {
      obj.type = "text";
    }
    return obj;
  });
}

export function getColumnId() {
  return "";
}

export function setTableStyle(rows, columns) {
  const returnObj = {};
  let numberString;
  for (let row = 1; row <= rows; row++) {
    numberString = row.toString();
    columns.forEach((column) => {
      returnObj["A" + numberString] = column.type;
    });
  }
  console.log(returnObj);
  return returnObj;
}
