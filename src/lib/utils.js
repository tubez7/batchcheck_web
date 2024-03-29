export const nonWhiteSpaceRegex = /\S/;
export const globalNumericRegex = /\d/g;

export function handleKeyDown(e) {
    const numericOnlyRegex = /\d/;
    const key = e.key;
    const validKeys = [
      "Backspace",
      "Delete",
      "Del",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!numericOnlyRegex.test(key) && !validKeys.includes(key)) {
      e.preventDefault();
    }
  }
