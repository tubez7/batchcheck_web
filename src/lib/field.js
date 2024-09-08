class Field {
  constructor(
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
    id
  ) {
    this.name = name;
    this.hasSerial = hasSerial;
    this.serial = serial;
    this.incrementValue = incrementValue;
    this.recordsPerIncrement = recordsPerIncrement;
    this.serialPadded = serialPadded;
    this.padLength = padLength;
    this.padLead = padLead;
    this.padTrail = padTrail;
    this.prefix = prefix;
    this.suffix = suffix;
    this.type = type;
    this.fieldNumber = fieldNumber;
    this.id = id;
    this.compositeData = [];
    this.compositeSeparator = "";
    this.expanded = false;
  }
}

export default Field;
