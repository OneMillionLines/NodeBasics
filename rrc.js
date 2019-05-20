const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
var info = [];
fs.createReadStream('in.csv')
    .pipe(csv())
    .on('data', (row) => {
        info.push(row);
    })
    .on('end', () => {
        fun()
    });

function fromServer(data) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3035',
            async: false,
            data: {name:data.name,cost:data.cost},
            method: (data.action),
        }).then((response) => {
            resolve(response)
            console.log("1");
        })
            .catch(function (error) {
                reject(error)
            });
    })
}
async function fun() {
    for (i = 0; i < info.length; i++) {
        let resp = await fromServer(info[i]);
    }
}



