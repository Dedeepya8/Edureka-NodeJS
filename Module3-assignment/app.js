const axios=require("axios").default
const express=require("express");
const app=express();

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    axios
    .get("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees")
    .then((response)=>{
        //res.json(response.data);
        res.render("application",{app: response.data})
    })
})

app.listen(3000,()=>{
    console.log("listening")
});
