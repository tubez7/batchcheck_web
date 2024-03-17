class Field {
  constructor(
    name,
    hasSerial,
    serial,
    incrementValue,
    recordsPerIncrement,
    padded,
    padLength,
    padLead,
    padTrail,
    prefix,
    suffix,
    type,
    fieldNumber
  ) {
    this.name = name;
    this.hasSerial = hasSerial;
    this.serial = serial;
    this.incrementValue = incrementValue;
    this.recordsPerIncrement = recordsPerIncrement;
    this.padded = padded;
    this.padLength = padLength;
    this.padLead = padLead;
    this.padTrail = padTrail;
    this.prefix = prefix;
    this.suffix = suffix;
    this.type = type;
    this.fieldNumber = fieldNumber;
  }
}

export default Field;
