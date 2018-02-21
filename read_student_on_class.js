var onclass = {};

const fs = require('fs');
var csv = require("fast-csv");

var path = "./input_files/class/student_on_class_58.csv"

function run() {

    csv
        .fromPath(path)
        .on("data", function (data) {
            if(data[0] != null && data[0] != ''){
                onclass[data[0]] = true;                
            }
            if(data[1] != null && data[1] != ''){
                onclass[data[1]] = false;                
            }
        })
        .on("end", function () {
            console.log(onclass);
            var json = JSON.stringify(onclass);
            fs.writeFile('./input_files/json/student_on_class_58.json', json, 'utf8', function readFileCallback(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
        
                }
            });
        });


   

}

// node .\read_student_on_class.js
run();
