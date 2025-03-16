import { padSerial } from "../src/lib/utils";

describe("padSerial()", () => {
  it("should return a string", () => {
    const result = padSerial("string", true, "A", 2);

    expect(typeof result === "string").toBe(true);
  });

  it("should return the first argument padded with the pad character to the length specified. Should be leading pad character if 'leading' bool is true", () => {
    const result = padSerial("B", true, "A", 2);

    expect(result).toBe("AB");
  });

  it("should return the first argument padded with the pad character to the length specified. Should be trailing pad character if 'leading' bool is false", () => {
    const result = padSerial("B", false, "A", 2);

    expect(result).toBe("BA");
  });
});
