'use strict';

const fs=require('fs')
const http = require('http')
const url = require('url');
//const {parse} =require('querystring')

function getDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var DateTime = date+' '+time;
    return DateTime;
}

const server= http.createServer((req,res)=>{
    // let body='';
    // req.on('data',chunk=>{
    //     body+=chunk.toString();
    //     });
    // req.on('end',()=>{
    //     const ParsedData=JSON.parse(body);
    //     console.log(ParsedData.name,"ASLAM");
    // });
    
    
    
    switch(req.method){
        case "GET":
            console.log("GET")

            var query=url.parse(req.url,true).query;
            var name=query.name;
            res.writeHead(200,{'Content-Type':'text/plain'});
            // let Gbody='';
            // req.on('data',chunk=>{
            //     Gbody+=chunk.toString();
            // });
            // req.on('end',()=>{
            //     console.log("data is received");
            // });
            // const ParsedDataBody=JSON.parse(Gbody);
            // console.log(ParsedDataBody);
            // const name=ParsedDataBody.name
            fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                const ParsedData=JSON.parse(data);
                const fruit=ParsedData[name];
                if(fruit.hasOwnProperty("history")){
                    fruit.history.push({[getDateTime()]:{"method":"get"}});
                }
                else{
                    fruit.history=[{[getDateTime()]:{"method":"get"}}];
                }
                ParsedData[name]=fruit;
                
                res.end(fruit["cost"]);
                fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }); 
            break;
        
        case "POST":
            console.log("POST")
            let Pbody=''
            let resp=''
            req.on('data',chunk=>{
                Pbody+=chunk.toString();
                });
            req.on('end',()=>{
 
                let ParsedDataBody=JSON.parse(Pbody);
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
            
            let Ptbody=''
            let Ptresp=''
            req.on('data',chunk=>{
                Ptbody+=chunk.toString();
                });
            req.on('end',()=>{
 
                let ParsedDataBody=JSON.parse(Ptbody);
                let name=ParsedDataBody.name
                console.log(ParsedDataBody);
                fs.readFile('fruits.json','utf-8',  (err,data) => {
                
                        const ParsedData=JSON.parse(data);
                        console.log(ParsedData);
                        if(ParsedData.hasOwnProperty(name)){
                            const fruit=ParsedData[name];
                            let OldCost=fruit.cost
                            fruit.cost=ParsedDataBody.cost;
                            fruit.history.push({[getDateTime()]:{"method":"PUT","current_cost":[ParsedDataBody.cost],"old_cost":OldCost}});
                            ParsedData[name]=fruit;
                        }
                        else{
                            res.end("Value does not exist use post");
                        }
                        res.writeHead(200,{'Content-Type':'text/plain'});
                       
                        fs.writeFile('fruits.json', JSON.stringify(ParsedData),'utf-8', (err) => {
                            if (err) throw err;
                            Ptresp=ParsedDataBody.name+" is inserted";
                            res.end(Ptresp);
                            console.log('The file has been saved!');
                        });
                });
            });
            break;
        case "DELETE":
        console.log("DELETE");
        let Dbody=''
        let Dresp=''
        req.on('data',chunk=>{
            Dbody+=chunk.toString();
            });
        req.on('end',()=>{
            let ParsedDataBody=JSON.parse(Dbody);
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
                        Dresp=ParsedDataBody.name+" is deleted";
                        res.end(Dresp);
                        console.log('The file has been saved!');
                    });
            });
            
        });
    break;
    }
    
});

console.log('server started at port 3035');
server.listen(3035);