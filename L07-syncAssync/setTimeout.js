// what if settimeout is zero
// trust issues with settimeout
 
console.log("hello World")

var a=1878698 
var b=28968 

setTimeout(()=>{
    console.log("call me ASAP")
},1000)
// even though if we took time as 0 instead of 3000 it will still print only afer multiplication because of libuv 
// lib uv only call this when v8 finish extecuting the main thread  and call stack becomes empty 
// thats why it print only afteer multiplication   

setTimeout(()=>{
    console.log("call me ASAP part 2")
},0 )

function multiplyFn(x,y){
    const result =a*b
    return result 
}

var c =multiplyFn(a,b)
console.log("multiplication result is: ",c)

// rough run out put 
//hello World
//multi result 
// call me asap 
// call me asap part 2

// actual output

// hello World
// multiplication result is:  54422123664
// call me ASAP part 2
// call me ASAP