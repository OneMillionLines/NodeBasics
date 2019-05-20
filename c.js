'use strict';

const fs=require('fs')
const http = require('http')
fs.readFile('input.csv','utf-8',  (err,data) => {
        if (err) throw err;
        let input=data.split('\n')
        for (var req_string of input){
            console.log(req_string)
            let my_req=req_string.split(',')
            switch(my_req[0]){
                case "Get":
                
                let url='http://localhost:3028/'+my_req[1]
                http.get(url,(res)=>{
                    
                    res.setEncoding('utf-8');
                    let rawData=''
                    res.on('data',(chunk)=>{
                        rawData+=chunk;
                    });
                    res.on('end',()=>{
                        try{
                            console.log(rawData);
                            
                        }
                        catch(e){
                            console.error(e.message);
                        }
                    });
                }).on('error',(e)=>{
                    console.error(`Got Error: ${e.message}`)
                });

                break;
                case "Put": 
                    var options = {
                        "method": "PUT",
                        "hostname":"localhost",
                          "port": "3028",
                          "headers": {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                          }
                        };

                    var req = http.request(options, function (res) {
                        var chunks = [];

                          res.on("data", function (chunk) {
                            chunks.push(chunk);
                          });

                          res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            console.log(body.toString());
                          });
                        });

                    req.write(JSON.stringify({ my_req[1]: my_req[2] }));
                    req.end();
                
                break;
                case "Post": 

                    var options = {
                      "method": "POST",
                      "hostname": "localhost",
                      "port": "3028",
                      "headers": {
                        "Content-Type": "text/plain",
                        
                        "Accept": "*/*",
                        "Host": "localhost:3028",
                       
                        "content-length": "2",
                        "Connection": "keep-alive",
                        "cache-control": "no-cache"
                      }
                    };

                    var req = http.request(options, function (res) {
                      var chunks = [];

                      res.on("data", function (chunk) {
                        chunks.push(chunk);
                      });

                      res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                      });
                    });

                    req.write(JSON.stringify({ my_req[1]: my_req[2] }));
                    req.end();
                    console.log(my_req[1],my_req[2]);
                    break;

                case "Delete": 
                    
                    var options = {
                      "method": "DELETE",
                      "hostname":"localhost",
                      "port": "3028",
                      "headers": {
                        "Content-Type": "text/plain",
                        "cache-control": "no-cache",
                        "Postman-Token": "d79207fe-f47c-4ca4-b73e-017d97211b3a"
                      }
                    };

                    var req = http.request(options, function (res) {
                      var chunks = [];

                      res.on("data", function (chunk) {
                        chunks.push(chunk);
                      });

                      res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                      });
                    });

                    req.write(my_req[1]);
                    req.end();
                    break;
            }
        }
        console.log('The file has been read!');
    });