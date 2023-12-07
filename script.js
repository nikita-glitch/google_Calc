//import { convert } from "./OPN";
let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
let allowedSymbols = ["*", "/", "+", "-", ".", "=", '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
let operationStorage = []; /*{
                              line:     
                              result:    
                              }*/

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
});
// document.addEventListener('keydown', (e)=>{
//   let target= e.target;
//   if (!e.code.includes('Key')) {
//     return

//   }
// })
document.addEventListener("keypress", (e) => {
  let buf;
  if (allowedSymbols.indexOf(e.key) != -1) {
      output.innerHTML += e.key;
  }
  if (allowedSymbols.indexOf(e.key) ) {
    console.log("aa");
  }
  if (e.code == "Equal") {
    buf = output.innerHTML.slice(0, output.innerHTML.length - 1);
    //output.innerHTML = eval(buf);
  }
});
