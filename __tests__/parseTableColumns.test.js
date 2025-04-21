import { parseTableColumns } from "../src/lib/utils";

describe("parseTableColumns()", () => {
  test("function should return an array", () => {
    expect(parseTableColumns()).toEqual([]);
  });

  test('function should return an array containing objects with a "title" property', () => {
    const input = [{ name: "name1" }, { name: "name 2" }];
    const expected = parseTableColumns(input);

    expected.forEach((element) => {
      expect(element).toHaveProperty("title");
    });
  });

  test('every returned object in the array should have a "type" property that is set to "text" by default', () => {
    const input = [
      { name: "name1", type: "value" },
      { name: "name 2", type: "value" },
    ];
    const expected = parseTableColumns(input);

    expected.forEach((element) => {
      expect(element.type).toBe("text");
    });
  });

  test('if an object in the input array has a type property value including the string "QR", it should return an object with a type of "image"', () => {
    const input = [
      { name: "name1", type: "Data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name 3", type: "QR" },
      { name: "name 4", type: "Visible data scan" },
    ];
    const expected = parseTableColumns(input);

    expected.forEach((element, i) => {
      if (input[i].type.includes("QR")) {
        expect(element.type).toBe("image");
      }
    });
  });

  test("original array should not be mutated", () => {
    const input = [
      { name: "name1", type: "Data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name3", type: "Composite Scan" },
      { name: "name 4", type: "Scan" },
    ];

    const expected = [
      { name: "name1", type: "Data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name3", type: "Composite Scan" },
      { name: "name 4", type: "Scan" },
    ];

    parseTableColumns(input);

    expect(input).toEqual(expected);
  });

  test("returned column object should have a readOnly property set to true, unless corresponding field object is a scan type", () => {
    const input = [
      { name: "name1", type: "Data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name3", type: "Composite Scan" },
      { name: "name 4", type: "QR" },
      { name: "name 5", type: "Visible data scan" },
      { name: "name 6", type: "Scan" },
    ];

    const expected = parseTableColumns(input);

    let typeCheck;

    expected.forEach((element, i) => {
      typeCheck = input[i].type.toUpperCase();
      if (!typeCheck.includes("SCAN")) {
        expect(element.readOnly).toBe(true);
      }
    });
  });
});
