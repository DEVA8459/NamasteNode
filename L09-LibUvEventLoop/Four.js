const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImediate"));

Promise.resolve("promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  console.log("file Reading CB");
});

setTimeout(() => console.log("time Expire "), 0);

process.nextTick(() => {process.nextTick(() => console.log("nextineer"));

  console.log("next");}
);

function printA() {
  console.log("a", a);
}
printA();

console.log("lastLine of File");

// a 100
// lastLine of File
// next
// nextineer - bexause nextTick has hihest level of priority so unless it fully resolve it wont move furtheer
// promise
// time Expire
// setImediate
// file Reading CB