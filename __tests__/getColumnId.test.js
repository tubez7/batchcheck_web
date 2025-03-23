import { getColumnId } from "../src/lib/utils";

describe("getColumnId()", () => {
  it("should return a string", () => {
    const result = getColumnId();

    expect(typeof result === "string").toBe(true);
  });

  it("should return the corresponding column id relative to the index of the array passed to it for arrays less than 27 in length", () => {
    const result = getColumnId(0);
    expect(result).toBe("A");

    const result2 = getColumnId(25);
    expect(result2).toBe("Z");
  });

  it("should return the corresponding column id relative to the index of the array passed to it for arrays over than 26 in length", () => {
    const result = getColumnId(26);
    expect(result).toBe("AA");

    const result2 = getColumnId(52);
    expect(result2).toBe("BA");
  });
});
