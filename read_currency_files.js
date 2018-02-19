
const Currency = require('./currency.js');
var l = [];
var list = {};

const fs = require('fs')

var csv = require("fast-csv");

async function run() {


    var currency_directory = "./input_files/currency/";
    var currency_files = fs.readdirSync(currency_directory);
    console.log(currency_files);

    for (var i = 0; i < currency_files.length; i++) {
        var currency_filepath = currency_directory + currency_files[i];
        var currency_filename = currency_filepath.split('/').pop();
        var currency_name = currency_filename.substring(0, 6);
        var d = await read(currency_filepath, currency_name);
        // console.log(currency_files[i]);
        // if(currency_files[i] == "USDTRY60.csv"){
            // console.log(list["EURUSD 2015.10.29 09:00"]);
            //do
        // }
        
        // console.log(currency_filename);
        var json = JSON.stringify(d);
        fs.writeFile('myjsonfile.json', json, 'utf8', function readFileCallback(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                
            }
        });
    }

}

//node --max_old_space_size=4096 .\read_currency_file.js
run();

function read(path, currency_name) {
    return new Promise(resolve => {
        csv
            .fromPath(path)
            .on("data", function (data) {
                // console.log(data);
                var key = currency_name + ' ' + data[0] + ' ' + data[1];
                // console.log(key);
                list[key] = new Currency(currency_name, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
            })
            .on("end", function () {
                console.log(path);
                resolve(list);
            });
    });


}





