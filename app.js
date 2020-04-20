const express = require("express");
const app = express();
const bp = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/brokerDB",{
useNewUrlParser: true,
useUnifiedTopology: true
});

const brokerSchema={
    email:String,
    password: String
}

const Broker = new mongoose.model("Broker",brokerSchema);

app.set('view engine','ejs');
app.use(bp.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.send("Home Page");
});


// Register page
app.get("/register", function (req, res) {
  res.render("register");
});
app.post("/register", function (req, res) {
  const newBroker = new Broker({
      email : req.body.email,
      password: req.body.password
  })
  newBroker.save(function(err){
      if(err){
          console.log(err);
      }
      else{
          res.redirect("/");
      }
  })
});

//login page

app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    Broker.findOne({email:email},function(err,foundBroker){
        if(err){
            console.log(err);
        }
        else{
            if(foundBroker){
                if(foundBroker.password===password)
                {
                    console.log("foundBroker")
                }
                else{
                    console.log("Account not found")
                }
            }
        }
    })
})


app.listen(3000,function()
{
    console.log("Connected to the sever")
})
