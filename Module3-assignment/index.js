//const axios= require("axios").default
const fs=require("fs");
const express=require("express");
const app=express();

app.get("/employee/:id",(req,res)=>{
    const employeeID=req.params.id;
    fs.readFile("employee.json",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send("Error Occured");
        }
        const stringData =data.toString();
        const parsedJSON= JSON.parse(stringData);
        //const employee=parsedJSON.find(_employee=>_employee.ID === employeeID);
        //console.log(parsedJSON.length);
        for(let i in parsedJSON){
            if(parsedJSON[i]['ID']==employeeID){
                res.json(parsedJSON[i]);
            }
        }
       // res.json({"message":"unable to locate the employee data"});
    })
})

app.get("/project/:id",(req,res)=>{
    const projectID=req.params.id;
    fs.readFile("project.json",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send("Error Occured");
        }
        const stringProjectData =data.toString();
        const parsedProjectJSON= JSON.parse(stringProjectData);
        //console.log(parsedProjectJSON);
        for(let i in parsedProjectJSON){
            if(parsedProjectJSON[i]['ProjectID']==projectID){
                res.json(parsedProjectJSON[i]);
            }
        }
        //res.json({"message":"unable to locate the project data"});
    })
})

function getProjectDetails(id){
    return new Promise((resolve, reject)=>{
        fs.readFile("project.json",(err,data)=>{
            if(err)
            {
                console.log(err);
                res.send("Error Occured");
            }
            const stringProjectData =data.toString();
            const parsedProjectJSON= JSON.parse(stringProjectData);
            //console.log(parsedProjectJSON);
            for(let i in parsedProjectJSON){
                if(parsedProjectJSON[i]['ProjectID']==id){
                    resolve(parsedProjectJSON[i]);
                }
            }
           // res.json({"message":"unable to locate the project data"});
        })
    })
}

function getalldetails(){
    return new Promise((resolve,reject)=>{

    })
}

app.get("/getemployeedetails",(req,res)=>{
    //const projectID=req.params.id;
    fs.readFile("employee.json",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send("Error Occured");
        }
        const stringData =data.toString();
        const parsedJSON= JSON.parse(stringData);
        var obj={};
        var ob1=[];
        var check=false;
        //console.log(parsedJSON);
        for(let i in parsedJSON){
            //console.log(i);
            //res.json(parsedJSON[i])
            getProjectDetails(parsedJSON[i]['ProjectID']).then((result)=>{
                obj=Object.assign(parsedJSON[i],result);
                //ob1=Object.assign(ob1,obj);
                ob1.push(obj);
                if(i==parsedJSON.length-1){
                    res.json(ob1)
                }
                //console.log("..............");
            })

        }
        //console.log(obj);
    
    })
})

app.listen(3000);