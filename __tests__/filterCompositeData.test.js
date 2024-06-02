import { filterCompositeData, searchAndDeleteField } from "../src/lib/utils";

function createDataArray() {
  const data = [];
  for (let j = 0; j < 10; j++) {
    data.push({ id: j + 1 });
  }
  return data;
}

function createFilteredData(id) {
  return searchAndDeleteField(createDataArray(), id);
}

function createData(func, ...args) {
  const array = [];
  for (let i = 0; i < 10; i++) {
    const data = func(...args);
    array.push({ id: i + 1, compositeData: data });
  }
  return array;
}

describe("filterCompositeData", () => {
  test("function returns an array", () => {
    const result = filterCompositeData();

    expect(Array.isArray(result)).toBe(true);
  });

  test("function should not return the same array it is passed", () => {
    const input = [];
    const result = filterCompositeData(input);

    expect(result).not.toBe(input);
  });

  test("function should filter the compositeData nested array of each object by the id parameter it is passed", () => {
    const input = createData(createDataArray);
    const expected = createData(createFilteredData, 5);
    const result = filterCompositeData(input, 5);

    expect(result).toEqual(expected);
  });

  test("function should not mutate input array", () => {
    const input = createData(createDataArray);
    const expected = createData(createDataArray);

    filterCompositeData(input, 2);
    expect(input).toEqual(expected);
  });
});
