var express = require('express');
var app = express();
var fs = require('fs');

app.use(function(req,res,next){
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
        res.sendFile(__dirname+"/home.html")
    }
    else{
        res.sendFile(__dirname+"/login.html")
    }
})

app.get('/',function(req,res){
    res.sendFile(__dirname+"/home.html");
})
app.get('/aboutus',function(req,res){
    res.sendFile(__dirname+"/aboutus.html");
})
app.get('/contactus',function(req,res){
    res.sendFile(__dirname+"/contactus.html");
})
app.get('/addcontact',function(req,res){
    // console.log(req.query);
    var data = JSON.parse(fs.readFileSync('contactlist.txt'));
    data.push(req.query);
    fs.writeFileSync('contactlist.txt',JSON.stringify(data));
    res.send("Wait Macha.....");
})
app.get('/contactlist',function(req,res){
    res.setHeader('Content-Type','text/html');
    var contactsdetails = fs.readFileSync('contactlist.txt').toString();
    
    var contactsdetailslist = `
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
app.post('/contactlist',function(req,res){
    console.log(req.query)
    // var details = fs.readFileSync('contactlist.txt').toString();
    // console.log(details)
    res.end();
})
app.listen(3300,()=>console.log('Server is running on 3300'));
