// when we are using ES modules 
// import { addcount,sub } from "./xyz.js"

// normal destructurnig 
const mathsop=require("./xyz")


// or we can directly do destructuring on fly 
const {addcount  ,sub }=require("./xyz")

var name= "namaste Nodejs"
let a=50
var b=20

 z="akash" //wont work in es module 
console.log(z)

//  using normal desturcturing 

mathsop.addcount(a,b)
mathsop.sub(a,b)

// so if we use destructure on fly we can directly write it as 

addcount(a,b)
sub(a,b)
console.log(name);

 
 