const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImediate"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("file Reading CB");
});

setTimeout(() => console.log("time Expire "), 0);

function printA() {
  console.log("a", a);
}
printA();

console.log("lastLine of File");


// expected 
 
// lastLine of FIle
// timeExpire
// file Reading CB
// setImediate

// actual

// lastLine of File
// time Expire
// setImediate
// file Reading CB

// because read is executed in 2 nd loop after it completed by os