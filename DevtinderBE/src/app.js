const express = require('express')

const app =express()

app.use("/Home", (req, res) => {
  res.send("welcome Home");
});
app.use("/", (req, res) => {
  res.send("on th eserver");
});
app.use("/hello",(req ,res)=>{
    res.send("Hello World");
});
 
app.listen(3000 ,()=>{
    console.log("Server is running on port 3000");
})