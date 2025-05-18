const express = require("express");
const users = require("./User.json");
const cors = require("cors");
const fs   = require("fs");
const { json } = require("stream/consumers");

const app = express();
const port = 8000;
app.use(express.json());  // user record post method use

// node policy setting 
app.use(
  cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
  })
);

// display user record GET METHOD

app.get("/users",(req,res)=>{
    return res.json(users);
});

// delete user record DELETE method 
app.delete("/users/:id",(req,res)=>{
  const id = Number(req.params.id);
  const FilterRecord = users.filter((user)=> user.id !== id);
  fs.writeFile("./User.json",JSON.stringify(FilterRecord),(error,data)=>{
     return res.json(FilterRecord);
  });
});

// add user records 
app.post("/users",(req,res)=>{
  // return res.json({data:req.body});
  let {name,age,city} = req.body;
  if( !name || !age || !city){
    res.status(400).send({"Message":"All fields required"});
  }
  let id = Date.now();
  users.push({id,name,age,city});

  fs.writeFile("./User.json",JSON.stringify(users),(error,data)=>{
    return res.json({"Message":"User detailes added success"});
  });


  // return res.json({"Message":"User detailes added success"});

});

// update user records
app.post("/users/:id",(req,res)=>{
  let id = Number(req.params.id);
  let {name,age,city} = req.body;
  if( !name || !age || !city){
    res.status(400).send({"Message":"All fields required"});
  }
  let index = users.findIndex((user)=> user.id === id);
  users.splice(index,1,{...req.body});

  fs.writeFile("./User.json",JSON.stringify(users),(error,data)=>{
    return res.json({"Message":"User detailes added success"});
  });

});


// server setup
app.listen(port, (error)=>{
  console.log(`Server runing in port ${port}`);
});