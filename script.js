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

const onButtonPress = (target) => {
  let strEnd = output.innerHTML.at(output.innerHTML.length - 1);
  if (target.className == "digit_button") {
    if (output.innerHTML == "0" && target.innerHTML == "0") {
      return;
    }
    if (
      target.className == "digit_button" &&
      output.innerHTML == result &&
      output.innerHTML == "0"
    ) {
      output.innerHTML = "";
      result = 0;
    }
    if (output.innerHTML == "0" && target.innerHTML != "0") {
      output.innerHTML = "";
    }

    output.innerHTML += target.innerHTML;
  } else if (target.className == "operation") {
    if (allowedSymbols.indexOf(strEnd) != -1 && target.id != "clear") {
    } else {
      switch (target.innerHTML) {
        case "+":
          output.innerHTML += "+";
          break;
        case "-":
          output.innerHTML += "-";
          break;
        case "*":
          output.innerHTML += "*";
          break;
        case "/":
          output.innerHTML += "/";
          break;
        case "=":
          result = eval(output.innerHTML);
          operationStorage.push({
            line: output.innerHTML,
            result: result,
          });
          output.innerHTML = result;
          break;
        case "C":
          output.innerHTML = "0";
          result = 0;
          break;
        case ".":
          let strEnd = output.innerHTML.at(output.innerHTML.length - 1);
          if (output.innerHTML.endsWith(".")) {
            return;
          }
          if (output.innerHTML == "0") {
            output.innerHTML += ".";
          } else if (allowedSymbols.indexOf(strEnd) != -1) {
            output.innerHTML += "0.";
          } else {
            output.innerHTML += ".";
          }
          break;
      }
    }
  }
};

const onKeyPress = (e) => {
  let buf;
  strEnd = expression.at(expression.length - 1)
  let isFirstLetterOperator =
    (expression == "0" || expression == "") &&
    allowedSymbols.indexOf(e.key) != -1;
  let isLastLetterOperator =
    allowedSymbols.indexOf(strEnd) != -1 && allowedSymbols.indexOf(e.key) != -1;
  if (isFirstLetterOperator) {
    return;
  }
  if (e.code.startsWith("Digit") || allowedSymbols.indexOf(e.key) != -1) {
    if (isLastLetterOperator) {
      return;
    } else if (expression == "0" || expression == "=") {
      expression = "";
    }
    if (expression == result && e.code.startsWith("Digit")) {
      expression = "";
      result = 0;
    }
    expression += e.key;
    output.innerHTML = expression
    if (allowedSymbols.includes(e.key) || !expression.includes(".")) {
      operationFlag = true;
    }
  }
  if (e.code == "Period") {
    if (allowedSymbols.indexOf(strEnd) != -1) {
      return;
    } else if (!operationFlag) {
      return;
    } else {
      expression += e.key;
      operationFlag = false;
    }
  }
  console.log(isFirstLetterOperator);
  console.log(isLastLetterOperator);
  console.log(strEnd);
  console.log(expression);
  if (e.key == "=" || e.code == "Enter") {
    
    // if (output.innerHTML == "=") {
    //   output.innerHTML = "0";
    //   return;
    // }
    // if (expression == result || expression == "") {
    //   return;
    // }
    buf = expression.slice(0, expression.length - 1);
    result = eval(buf);
    expression = result;
    operationStorage.push({
      line: buf,
      result: result,
    });
    output.innerHTML = result;
  }
};

const calculateExpression = () => {};

const showHistory = () => {
  let history = document.querySelector(".history");

  if (history.childNodes.length > 1) {
    history.remove();
    history = null;
    let div = document.createElement("div");
    div.setAttribute("class", "history");
    div.innerHTML = "history";
    let [outputs] = document.getElementsByClassName("outputs");
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
      prevOps.append(container);
      line.setAttribute("class", "line");
      result.setAttribute("class", "result");
      line.innerHTML = item.line;
      result.innerHTML = item.result;
      container.append(line);
      container.append("=");
      container.append(result);
    }
    prevOps.addEventListener("click", (e) => {
      let target = e.target;
      if (target.tagName != "SPAN") {
        return;
      }
      output.innerHTML = target.innerHTML;
    });
  }
};

const calculatetrigonometry = (target) => {
  if (target.id != "sin" && target.id != "cos" && target.id != "log") {
    return;
  }
  let buf = output.innerHTML;
  let strEnd = output.innerHTML.at(output.innerHTML.length - 1);
  if (allowedSymbols.indexOf(strEnd) != -1) {
    buf = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }
  buf = eval(buf);
  switch (target.id) {
    case "sin":
      output.innerHTML = result = Math.sin(buf);
      operationStorage.push({
        line: `sin(${buf})`,
        result: Math.sin(buf),
      });
      break;
    case "cos":
      output.innerHTML = result = Math.cos(buf);
      operationStorage.push({
        line: `cos(${buf})`,
        result: Math.cos(buf),
      });
      break;
    case "log":
      output.innerHTML = result = Math.log10(buf);
      operationStorage.push({
        line: `log(${buf})`,
        result: Math.log10(buf),
      });
      break;
  }
};

document.addEventListener("click", (e) => {
  let target = e.target;

  if (target.tagName == "BUTTON") {
    calculatetrigonometry(target);
    onButtonPress(target);
    if (e.target.className == "history" && operationStorage.length != 0) {
      showHistory();
    }
  } else if (target.className != "outputs") {
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
    expression = expression.slice(0, expression.length - 1);
    output.innerHTML = expression;
  }
});
