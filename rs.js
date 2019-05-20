'use strict';

const fs=require('fs')
const http = require('http')
const {parse} =require('querystring')

function getDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var DateTime = date+' '+time;
    return DateTime;
}

const server= http.createServer((req,res)=>{
    //console.log(req);
    
    switch(req.method){
        case "GET":
            let name=req.url.substring(1)
            console.log("GET")
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                const user=ParsedData[name];
                if(user.hasOwnProperty("history")){
                    user.history.push({[getDateTime()]:{"method":"get"}});
                }
                else{
                    user.history=[{[getDateTime()]:{"method":"get"}}];
                }
                ParsedData[name]=user;
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end(user["cost"]);
                fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }); 
            break;
        
        case "POST":
            console.log("POST")
            let body=''
            let resp=''
            req.on('data',chunk=>{
                body+=chunk.toString();
                });
            req.on('end',()=>{
 
                let ParsedDataBody=parse(body);
                let name=ParsedDataBody.name
                console.log(ParsedDataBody);
                fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                        const ParsedData=JSON.parse(data);
                        console.log(ParsedData);
                        if(ParsedData.hasOwnProperty(name)){
                            res.end("Value already exists use put");
                        }
                        else{
                            let nameVal={"cost":ParsedDataBody.cost,"history":[{[getDateTime()]:{"method":"post","current_cost":[ParsedDataBody.cost]}}]}
                            ParsedData[name]=nameVal;
                        }
                        res.writeHead(200,{'Content-Type':'text/plain'});
                       
                        fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                            if (err) throw err;
                            resp=ParsedDataBody.name+" is inserted";
                            res.end(resp);
                            console.log('The file has been saved!');
                        });
                });
                //resp=ParsedDataBody.name+" is not inserted";
                //res.end(resp);
            });
            break;
        case "PUT":
            console.log("PUT")
            let body1=''
            let resp1=''
        req.on('data',chunk=>{
            body1+=chunk.toString();
            });
        req.on('end',()=>{
            let ParsedDataBody=parse(body1);
            let name=ParsedDataBody.name
            console.log(ParsedDataBody);
            fs.readFile('fruits.json','utf-8',  (err,data) => {
            
                    const ParsedData=JSON.parse(data);
                    
                    if(ParsedData.hasOwnProperty(name)){
                        //let nameVal={"cost":ParsedDataBody.cost,"history":[{[getDateTime()]:{"method":"post","current_cost":[ParsedDataBody.cost]}}]}
                        //ParsedData[name]=nameVal;
                        const user=ParsedData[name];
                        let OldCost=user.cost
                        user.cost=ParsedDataBody.cost;
                        user.history.push({[getDateTime()]:{"method":"PUT","current_cost":[ParsedDataBody.cost],"old_cost":OldCost}});
                        ParsedData[name]=user;
                    }
                    else{
                        res.end("Value does not exist use post");
                    }
                    res.writeHead(200,{'Content-Type':'text/plain'});
                   
                    fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                        if (err) {
                            resp1=ParsedDataBody.name+" is not updated";
                            res.end(resp1);
                            throw err;}
                        resp1=ParsedDataBody.name+" is updated";
                        res.end(resp1);
                        console.log('The file has been saved!');
                    });
            });
            
        });
        break;
        case "DELETE":
            console.log("DELETE");
            let body2=''
            let resp2=''
            req.on('data',chunk=>{
                body2+=chunk.toString();
                });
            req.on('end',()=>{
                let ParsedDataBody=parse(body2);
                let name=ParsedDataBody.name
                console.log(ParsedDataBody);
                fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                        const ParsedData=JSON.parse(data);
                        
                        if(ParsedData.hasOwnProperty(name)){
                            delete ParsedData[name];
                        }
                        else{
                            res.end("Value does not exist use post");
                        }
                        res.writeHead(200,{'Content-Type':'text/plain'});
                    
                        fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                            if (err) {
                                resp2=ParsedDataBody.name+" is not deleted";
                                res.end(resp2);
                                throw err;}
                            resp2=ParsedDataBody.name+" is deleted";
                            res.end(resp2);
                            console.log('The file has been saved!');
                        });
                });
                
            });
        break;
    }
    
});

console.log('server started at port 3028');
server.listen(3028);