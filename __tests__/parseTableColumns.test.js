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
      { name: "name1", type: "data" },
      { name: "name 2", type: "Composite QR" },
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
      { name: "name1", type: "data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name1", type: "Composite Scan" },
      { name: "name 2", type: "Scan" },
    ];

    const expected = [
      { name: "name1", type: "data" },
      { name: "name 2", type: "Composite QR" },
      { name: "name1", type: "Composite Scan" },
      { name: "name 2", type: "Scan" },
    ];

    parseTableColumns(input);

    expect(input).toEqual(expected);
  });
});
