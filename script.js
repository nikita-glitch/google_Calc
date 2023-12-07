let [div] = document.getElementsByClassName("digits");
let [output] = document.getElementsByClassName("output");
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
document.addEventListener('keypress', (e)=>{
  let buf;
  if (!e.code.includes('Key')) {
    output.innerHTML += e.key;
  }
  if (e.code == 'Equal') {
    buf = output.innerHTML;
    //operationStorage = output.innerHTML;
    calculate(buf);
  }
})
let calculate = (buf) => { //split

}

