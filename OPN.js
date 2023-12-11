export function convert(string) {
  let priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "(": 3,
    ")": 2,
  };
  string = string.split('');
  let stack = [];
  let out = "";
  for (const char of string) {
    
    if (!isNaN(char)) {
      out += char
    } else {
      if (stack.length == 0) {
        stack.push(char);
      }
    }
  }
}
