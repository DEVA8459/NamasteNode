const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImediate"));

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf8", () => {
  console.log("file Reading CB");
});

setTimeout(() => console.log("time Expire "), 0);

process.nextTick(()=> console.log("next"))

function printA() {
  console.log("a", a);
}
printA();

console.log("lastLine of File");

// lastLine of File
// next
// promise
// time Expire
// setImediate
// file Reading CB