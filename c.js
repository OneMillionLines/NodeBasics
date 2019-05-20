'use strict';


const fs=require('fs')
const http = require('http')
var request = require("request");


fs.readFile('input.csv','utf-8',  (err,data) => {
        if (err) throw err;
        let input=data.split('\n')
        for (var req_string of input){
            console.log(req_string)
            let my_req=req_string.split(',')
            switch(my_req[0]){
                case "Get":
                  console.log("Get")

                  // let url='http://localhost:3028/'+my_req[1]
                  // http.get(url,(res)=>{
                      
                  //     res.setEncoding('utf-8');
                  //     let rawData=''
                  //     res.on('data',(chunk)=>{
                  //         rawData+=chunk;
                  //     });
                  //     res.on('end',()=>{
                  //         try{
                  //             console.log(rawData);
                              
                  //         }
                  //         catch(e){
                  //             console.error(e.message);
                  //         }
                  //     });
                  // }).on('error',(e)=>{
                  //     console.error(`Got Error: ${e.message}`)
                  // });

                  break;
                case "Put": 
                  console.log("PUT")

                  
                  break;
                case "Post": 
                  console.log("POST")
                  var options = { method: 'POST',
                    url: 'http://localhost:3028/',
                    headers: 
                    { 'cache-control': 'no-cache',
                      Connection: 'keep-alive',
                      'content-length': '20',
                      'accept-encoding': 'gzip, deflate',
                      Host: 'localhost:3028',
                      'Cache-Control': 'no-cache',
                      Accept: '*/*',
                      'User-Agent': 'aslam',
                      'Content-Type': 'application/x-www-form-urlencoded' },
                    form: { name: my_req[1], cost: my_req[2] } };

                  request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    console.log(body);
                  });
                  console.log(my_req[1],my_req[2]);
                  break;
                case "Delete": 
                  console.log("delete")
                  break;
            }
        }
        console.log('The file has been read!');
    });