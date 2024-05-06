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
