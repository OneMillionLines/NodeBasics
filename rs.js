'use strict';

const fs=require('fs')
const http = require('http')
const {parse} =require('querystring')

const server= http.createServer((req,res)=>{
    console.log(req);
    
    switch(req.method){
        case "GET":
            let name=req.url.substring(1)
            console.log("GET")
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                const user=ParsedData[name];
                if(user.hasOwnProperty("history")){
                    user.history.push({getDateTime():{"method":"get"}});
                }
                else{
                    user.history=[{getDateTime():{"method":"get"}}];
                }
                ParsedData[id]=user;
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end(user["cost"]);
                fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }); 
             
            
            break;
        case "POST":
            
            
            let body=''
            let resp=''
            req.on('data',chunk=>{
                body+=chunk.toString();
                });
            req.on('end',()=>{
                let ParsedDataBody=parse(body);
                console.log(ParsedDataBody);
                fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                        const ParsedData=JSON.parse(data);
                        const user=ParsedData[name];
                        if(user.hasOwnProperty("history")){
                            user.history.push(getDateTime());
                        }
                        else{
                            user.history=getDateTime;
                        }
                        ParsedData[id]=user;
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end(user["cost"]);
                        fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                        });
                });
                resp=ParsedData.name+" is inserted";
                res.end(resp);
            });
             
             
            
           
            //res.end("yes"); 
             
            
            break;
        case "PUT":
            console.log(req.payload);
            console.log("PUT");
            res.end("yes1"); a
             
            
            break;
        case "DELETE":
            console.log("DELETE");
            console.log(req.payload);
            res.end("yes3"); 
             
            
            break;

    }
    
});

console.log('server started at port 3028');
server.listen(3028);