console.log("i am mf millanaire")
// when using ES 
// go to package.json and change type to moudle from common js 

// export function  addcount (a,b){
//     const sum =a+b
//     console.log(sum)
// }
// export const sub =(a,b)=>{
//     const sub =a-b
//     return console.log(sub) 

// }

// when using commonjs 
// go to package.json and change type to commonjs from module or we can simply delete package.json beacuase common js is default 

 function  addcount (a,b){
    const sum =a+b
    console.log(sum)
}
 const sub =(a,b)=>{
    const sub =a-b
    return console.log(sub)

}
module.exports={addcount,sub}
