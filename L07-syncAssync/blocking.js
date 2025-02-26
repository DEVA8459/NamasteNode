const crypto = require ("node:crypto")
console.log("hello World");
var a = 1078698;
var b = 28986;

// pbkdf2 = Password Base Key Deravtive Function v2

// Synchronous Function - those who have sync in name Will BLOCK THE MAIN THREAD DONOT USE IT
// blocks the code
// more in notes but in the last of lecture 6

crypto.pbkdf2Sync("password","salt", 5000000,50 ,"sha512");
console.log("first key is generated")



// Async Function
crypto.pbkdf2("password","salt", 500000,50 ,"sha512",(err,key)=>{
    console.log("second key is generated")
});


function multiptyFn(x, y) {
const result= a * b;
return result;
}
console.log(multiptyFn(a,b))

// output
// hello World
// first key is generated
// 31267140228
// second key is generated