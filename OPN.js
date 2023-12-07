function Convert(string) {
  let priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "(": 3,
    ")": 2,
  };
  let stack = [];
  let out = "";
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      out += string[i];
    } else {
      if (stack.length == 0) {
        stack.push(string[i]);
      }
    }
  }
}
