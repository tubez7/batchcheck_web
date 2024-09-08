import { amendFieldExpanded } from "../src/lib/utils";

describe("amendFieldExpanded()", () => {
  test("function returns an array ", () => {
    const input = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: false },
    ];
    const result = amendFieldExpanded(input, 0);

    expect(Array.isArray(result)).toBe(true);
  });

  test("function returns a different array to the one passed", () => {
    const input = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: false },
    ];
    const result = amendFieldExpanded(input, 0);

    expect(result).not.toBe(input);
  });

  test("function flips the expanded property boolean for the object at the specified index", () => {
    const input = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: false },
    ];
    const result = amendFieldExpanded(input, 1);
    const expected = [
      { id: 1, expanded: false },
      { id: 3, expanded: true },
      { id: 2, expanded: false },
    ];

    expect(result).toEqual(expected);
  });

  test("function flips the expanded property boolean for the object at the specified index", () => {
    const input = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: true },
    ];
    const result = amendFieldExpanded(input, 2);
    const expected = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: false },
    ];

    expect(result).toEqual(expected);
  });

  test("function flips the expanded property boolean for the object at the specified index and sets te property to false for all other indexes", () => {
    const input = [
      { id: 1, expanded: false },
      { id: 3, expanded: false },
      { id: 2, expanded: true },
    ];
    const result = amendFieldExpanded(input, 0);
    const expected = [
      { id: 1, expanded: true },
      { id: 3, expanded: false },
      { id: 2, expanded: false },
    ];

    expect(result).toEqual(expected);
  });
});
