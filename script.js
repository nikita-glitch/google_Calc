let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
let allowedSymbols = ["*", "/", "+", "-", "="];
let operationStorage = [];
let result = 0;
let operationFlag;

for (let i = 0; i <= 9; i++) {
  let button = document.createElement("button");
  button.setAttribute("id", i);
  button.setAttribute("class", "digit_button");
  button.innerHTML = i;
  div.prepend(button);
}

document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName != "BUTTON") {
    return;
  }
  if (target.className == "digit_button") {
    if (output.innerHTML == 0 && target.innerHTML == 0) {
      return;
    }
    if (target.className == "digit_button" && output.innerHTML == result) {
      output.innerHTML = "";
      result = 0;
    }
    if (output.innerHTML == "0" && target.innerHTML != 0) {
      output.innerHTML = "";
    }
    output.innerHTML += target.innerHTML;
  } else if (target.className == "operation") {
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
});

document.addEventListener("keypress", (e) => {
  let buf;
  
  if (e.code.startsWith("Digit") || allowedSymbols.indexOf(e.key) != -1) {
    let strEnd = output.innerHTML.at(output.innerHTML.length - 1);
    if (
      allowedSymbols.indexOf(strEnd) != -1 &&
      allowedSymbols.indexOf(e.key) != -1
    ) {
      return;
    } else if (output.innerHTML == "0" || output.innerHTML == "=") {
      output.innerHTML = "";
    }
    if (output.innerHTML == result && e.code.startsWith("Digit")) {
      output.innerHTML = "";
      result = 0;
    }
    output.innerHTML += e.key;
    if (allowedSymbols.includes(e.key) || !output.innerHTML.includes('.')) {
      operationFlag = true;
    }
  }
console.log(operationFlag);
  if (e.code == "Period") {
    let strEnd = output.innerHTML.at(output.innerHTML.length - 1);
    if (allowedSymbols.indexOf(strEnd) != -1) {
      return;
    }  else if (!operationFlag) {
      return;
    } else {
      output.innerHTML += e.key;
      operationFlag = false;
    }
  }

  if (e.code == "Equal") {
    console.log(output.innerHTML, result);
    if (output.innerHTML == "=") {
      output.innerHTML = "0";
      return;
    }
    if (output.innerHTML == result || output.innerHTML == "") {
      return;
    }
    buf = output.innerHTML.slice(0, output.innerHTML.length - 1);
    result = eval(buf);
    output.innerHTML = result;
    operationStorage.push({
      line: buf,
      result: result,
    });
  }
});

document.addEventListener("keypress", (e) => {
  if (output.innerHTML == "0" || output.innerHTML == "") {
    return;
  }
  if (e.code == "Delete") {
    output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length - 1);
  }
});

document.addEventListener("click", (e) => {
  let [history] = document.getElementsByClassName("history");

  if (e.target.className != "history") {
    return;
  }
  if (operationStorage.length == 0) {
    return;
  }
  if (history.childNodes.length > 1) {
    history.remove();
    history = null;
    let div = document.createElement("div");
    div.setAttribute("class", "history");
    div.innerHTML = "history";
    let [outputs] = document.getElementsByClassName("outputs");
    outputs.prepend(div);
    console.log(document.getElementsByClassName("history"));
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
});

document.addEventListener("click", (e) => {
  let target = e.target;
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
});
document.addEventListener("click", (e) => {
  let target = e.target;
  if (target.className != "outputs") {
    let [outputs] = document.getElementsByClassName("outputs");
    outputs.removeAttribute("id");
    return;
  }
  target.setAttribute("id", "focused_outputs");
});
