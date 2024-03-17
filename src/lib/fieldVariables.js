$: recordError = records < 1 || !Number.isInteger(records); //1
export let fieldName = "";
export let fieldNameError = false;
export const regex = /\S/;
$: validFieldName = !fieldName.length < 1 && regex.test(fieldName); //2
export let hasSerial = false;
$: serial = hasSerial ? 0 : null; //3
$: validSerial = hasSerial ? serial === null || serial >= 0 : true; //4
export let incrementValue = 0;
$: validIncrement = Number.isInteger(incrementValue); //5
export let recordsPerIncrement = 1;
$: validRecordPerIncrement =
  recordsPerIncrement > 0 && Number.isInteger(recordsPerIncrement); //6
export let serialPadded = false;
$: minimumPadLength = serialPadded
  ? serial
    ? serial.toString().match(/\d/g)?.length || 1
    : 1
  : null; //7
  export let padLength = null;
$: validPadLength = padLength === null || padLength >= minimumPadLength; //8
export let padLeading = "";
export let padTrailing = "";
export let prefix = "";
export let suffix = "";
export let type = "data";
export let buttonDisable = true;
