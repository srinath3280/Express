var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.post("/authenticate",function(req,res){
    var users = JSON.parse(fs.readFileSync('users.txt'));
    var filteredUser = users.filter((user)=>{
        if(user.username === req.body.username && user.password === req.body.password){
            return true
        }
    })
    if(filteredUser.length!=0){
        var token = jwt.sign(req.body,"srinath");
        res.cookie('token',token);
        res.sendFile(__dirname+"/home.html")
    }
    else{
        res.sendFile(__dirname+"/login.html")
    }
})
function isLoggedIn(req,res,next){
    if(jwt.decode(req.cookies.token)){
        next()
    }
    else{
        res.redirect("/login")
    }
}
app.get("/",isLoggedIn,function(req,res){
    res.send("Hi...")
})
app.get("/aboutus",function(req,res){
    res.sendFile(__dirname+"/aboutus.html")
})
app.get("/contactus",function(req,res){
    res.sendFile(__dirname+"/contactus.html")
})
app.get("/contactlist",function(req,res){
    res.setHeader('Content-Type','text/html');
    var contactsdetails = fs.readFileSync('contactlist.txt').toString();
    
    var contactsdetailslist = `
        <h1>List of contacts</h1>
        <ul>
            ${
                JSON.parse(contactsdetails).map((c,i)=>{
                    return (
                        `<li>
                            Full Name:${c.fullname},&nbsp;Address:${c.place}
                            <button>Delete</button>
                        </li>`
                    )
                })
            }
        </ul>
    `
    res.write(contactsdetailslist);
    res.end()
})

app.listen(3600,()=>{console.log('Server running on 3600')})