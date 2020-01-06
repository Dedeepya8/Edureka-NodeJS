//const connection = require("./model");
const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const moment=require('moment');
const mongoose=require("mongoose");


mongoose.connect("mongodb://localhost:27017/edureka");

var OrderSchema = new mongoose.Schema({
    name:String,
    address:String,
    email:String,
    phoneSelected:String,
    date: Date,
    status: String
});


var Order=mongoose.model("Order",OrderSchema);
let d1=moment();
//console.log("d1=",d1);
//app.set('views',__dirname+'/views');

app.set("view engine","ejs")

app.get("/",(req,res,next)=>{
    res.render("home")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post("/addOrder",(req,res)=>{
 var myOrder =new Order(req.body);
 myOrder.date =new Date();
 myOrder.save()
 .then(order=>{
     res.send("Order saved to database");
 })
 .catch(err=>{
     res.status(400).send("Unable to save to DB");
 });
});

app.get("/adminView",(req,res,next)=>{
    //console.log("1");
    Order.find(function(err,data){
        if(err){
            res.status(500).send(err);
        }
        else{
           
            //res.json(data);
            //console.log(data);
            for(var i=0;i<data.length;i++){
                let regDate=data[i].date;
                let hr=d1.diff(regDate,"hours")
                //console.log(i,day);
                if(hr>=0 && hr<=24){
                    data[i].status="In progress";
                }
                else if(hr>24 && hr<=48){
                    data[i].status="Dispatched";
                }
                else if(hr>48){
                    data[i].status="Delivered";
                }
            }
            res.render("admin",{x:data});
           // console.log("3");
        }
    })

})

app.listen("3000",()=>{
    console.log("server started");
})