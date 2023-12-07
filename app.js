var express = require('express');
var app = express();
var fs = require('fs');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})
app.get('/aboutus',(req,res)=>{
    res.sendFile(__dirname+"/aboutus.html");
})
app.get('/contactus',(req,res)=>{
    res.sendFile(__dirname+"/contactus.html");
})
app.get('/addcontact',(req,res)=>{
    // console.log(req.query);
    var data = JSON.parse(fs.readFileSync('contactlist.txt'));
    data.push(req.query);
    fs.writeFileSync('contactlist.txt',JSON.stringify(data));
    res.send("Wait Macha.....");
})
app.get('/contactlist',(req,res)=>{
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
app.post('/contactlist',(req,res)=>{
    console.log(req.query)
    // var details = fs.readFileSync('contactlist.txt').toString();
    // console.log(details)
    res.end();
})
app.listen(4000,()=>console.log('Server is running on 4000'));
