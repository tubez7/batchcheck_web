import { filterById, filterCompositeData } from "../src/lib/utils";

function createDataArray() {
  const data = [];
  for (let j = 0; j < 10; j++) {
    data.push({ id: j + 1 });
  }
  return data;
}

function createFilteredData(id) {
  return filterById(createDataArray(), id);
}

function createData(callback, callback2, ...args) {
  const array = callback2();
  return array.map((element) => ({
    ...element,
    compositeData: callback(...args),
  }));
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
    const input = createData(createDataArray, createDataArray);
    const expected = createData(createFilteredData, createDataArray, 5);
    const result = filterCompositeData(input, 5);

    expect(result).toEqual(expected);
  });

  test("function should not mutate input array", () => {
    const input = createData(createDataArray, createDataArray);
    const expected = createData(createDataArray, createDataArray);

    filterCompositeData(input, 2);
    expect(input).toEqual(expected);
  });
});
