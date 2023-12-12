const div = document.querySelector(".digits");
const output = document.querySelector(".output");
const allowedSymbols = ["*", "/", "+", "-", "="];
const operationStorage = [];
let expression = "0";
let strEnd;
let result = 0;
let operationFlag;

const generateButtons = () => {
  for (let i = 0; i <= 9; i++) {
    let button = document.createElement("button");
    button.setAttribute("id", i);
    button.setAttribute("class", "digit_button");
    button.innerHTML = i;
    div.prepend(button);
  }
};
generateButtons();
const handlePointKeypress = (e, operationFlag) => {
  if (allowedSymbols.indexOf(strEnd) != -1) {
    return;
  } else if (!operationFlag) {
    return;
  } else {
    expression += e.key;
    
  }
  return false;
}
const handlePointClick = () => {
  strEnd = expression.at(expression.length - 1);
  if (expression.endsWith(".")) {
    return;
  }
  if (expression == "0") {
    expression += ".";
  } else if (allowedSymbols.indexOf(strEnd) != -1) {
    expression += "0.";
  } else {
    expression += ".";
  }
  output.innerHTML = expression;
};
const handleEqualityClick = () => {
  let buf;
  if (expression == result) {
    return;
  }
  if (expression == "0") {
    return;
  }
  if (expression == "=") {
    expression = "0";
    return;
  }
  if (expression.endsWith("=")) {
    buf = expression.slice(0, expression.length - 1);
  } else {
    buf = expression;
  }
  result = eval(buf);
  operationStorage.push({
    line: buf,
    result: result,
  });
  expression = "";
  expression += result;
  output.innerHTML = expression;
};
const handleClear = () => {
  if (expression == "0") {
    return;
  }
  expression = expression.slice(0, expression.length - 1);
  if (expression == "") {
    expression = "0";
  }
  output.innerHTML = expression;
};
const onButtonPress = (target) => {
  strEnd = expression.at(expression.length - 1);
  if (target.className == "digit_button") {
    if (expression == "0" && target.innerHTML == "0") {
      return;
    }
    if (
      target.className == "digit_button" &&
      expression == result &&
      expression == "0"
    ) {
      expression = "";
      result = 0;
    }
    if (expression == "0" && target.innerHTML != "0") {
      expression = "";
    }

    expression += target.innerHTML;
  } else if (target.className == "operation") {
    let isLastLetterOperator =
      allowedSymbols.indexOf(strEnd) != -1 && target.id != "clear";
    if (isLastLetterOperator) {
      return;
    } else {
      if (target.innerHTML == "=") {
        handleEqualityClick();
        return;
      }
      if (target.innerHTML == "C") {
        handleClear();
        return;
      }
      if (target.innerHTML == ".") {
        handlePointClick();
        return;
      }
      expression += target.innerHTML;
    }
  }
  output.innerHTML = expression;
};

const onKeyPress = (e) => {
  let buf;
  strEnd = expression.at(expression.length - 1);
  let isFirstLetterOperator =
    (expression == "0" || expression == "") &&
    allowedSymbols.indexOf(e.key) != -1;
  let isLastLetterOperator =
    allowedSymbols.indexOf(strEnd) != -1 && allowedSymbols.indexOf(e.key) != -1;
  let isInputCorrect =
    e.code.startsWith("Digit") || allowedSymbols.indexOf(e.key) != -1;
  let isOperation = allowedSymbols.includes(e.key) || !expression.includes(".");
  if (isFirstLetterOperator || isLastLetterOperator) {
    return;
  }
  if (isInputCorrect) {
    if (expression == "0" || expression == "=") {
      expression = "";
    }
    if (isOperation) {
      operationFlag = true;
    }
    expression += e.key;
  }
  if (e.code == "Period") {
    operationFlag = handlePointKeypress(e, operationFlag);
  }
  if (e.key == "=" || e.code == "Enter") {
    handleEqualityClick();
  }
  output.innerHTML = expression;
};

const showHistory = () => {
  let history = document.querySelector(".history");
  if (history.childNodes.length > 1) {
    history.remove();
    history = null;
    let div = document.createElement("div");
    div.setAttribute("class", "history");
    div.innerHTML = "history";
    let outputs = document.querySelector(".outputs");
    outputs.prepend(div);
  } else {
    let prevOps = document.createElement("div");
    prevOps.setAttribute("class", "prevOps");
    history.append(prevOps);
    prevOps.tabIndex = 0;
    for (const item of operationStorage) {
      let line = document.createElement("span");
      let result = document.createElement("span");
      let container = document.createElement("div");
      line.setAttribute("class", "line");
      result.setAttribute("class", "result");
      line.innerHTML = item.line;
      result.innerHTML = item.result;
      prevOps.append(container);
      container.append(line);
      container.append("=");
      container.append(result);
    }
    prevOps.addEventListener("click", (e) => {
      let target = e.target;
      if (target.tagName != "SPAN") {
        return;
      }
      expression = target.innerHTML;
      output.innerHTML = expression;
    });
  }
};

const calculatetrigonometry = (target) => {
  let buf = expression;
  let strEnd = expression.at(expression.length - 1);
  if (allowedSymbols.indexOf(strEnd) != -1) {
    buf = expression.slice(0, expression.length - 1);
  }
  buf = eval(buf);
  switch (target.id) {
    case "sin":
      result = Math.sin(buf);
      operationStorage.push({
        line: `sin(${buf})`,
        result: Math.sin(buf),
      });
      break;
    case "cos":
      result = Math.cos(buf);
      operationStorage.push({
        line: `cos(${buf})`,
        result: Math.cos(buf),
      });
      break;
    case "log":
      result = Math.log10(buf);
      operationStorage.push({
        line: `log(${buf})`,
        result: Math.log10(buf),
      });
      break;
  }
  expression = "";
  expression += result;
  output.innerHTML = expression;
};

document.addEventListener("click", (e) => {
  let target = e.target;

  if (target.tagName == "BUTTON") {
    if (target.id != "sin" && target.id != "cos" && target.id != "log") {
      onButtonPress(target);
    } else {
      calculatetrigonometry(target);
    }
  }
  if (e.target.className == "history" && operationStorage.length != 0) {
    showHistory();
  }
  if (target.className != "outputs") {
    let outputs = document.querySelector(".outputs");
    outputs.removeAttribute("id");
    return;
  } else {
    target.setAttribute("id", "focused_outputs");
  }
});

document.addEventListener("keypress", (e) => {
  onKeyPress(e);
});

document.addEventListener("keydown", (e) => {
  if (expression == "0" || expression == "") {
    return;
  }
  if (e.code == "Backspace") {
    handleClear();
  }
});
