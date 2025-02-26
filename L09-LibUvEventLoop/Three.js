//last Line of File
//nextTick
//  promise
//TimerExpired
//set immidiete
//2ndTick
//2ndTimer
//2ndimmideit
// file reding cb

const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImediate"));
setTimeout(() => console.log("time Expire "), 0);

Promise.resolve("promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("time2 Expire "), 0);
  process.nextTick(() => console.log("2next"));
  setImmediate(() => console.log("2setImediate"));

  console.log("file Reading CB");
});

process.nextTick(() => console.log("next"));

function printA() {
  console.log("a", a);
}
printA();

console.log("lastLine of File");


// reality 

// a 100
// lastLine of File
// next
// promise
// time Expire
// setImediate

// file Reading CB --bc that whole read is now fed to v8 call stack and it started reading it line by line so async are again fed to libuv
// 2next
// 2setImediate -- bc after feding read to call stack it dosenot goese directly to timer phase it contd its journey from poll phase so immediate came first and timer later
// time2 Expire