const fs = require('fs')

var csv = require("fast-csv");

var list = {};

async function run() {
    var directory = "./input_files/ports1/58-1/";
    var files = fs.readdirSync(directory);
    console.log(files);

    for (var i = 0; i < files.length; i++) {
        var filepath = directory + files[i];
        var filename = filepath.split('/').pop();
        var account_ls = filename.split('.');
        var account_no = account_ls[0];
        list[account_no] = false;
        var d = await read(filepath, account_no);
        var json = JSON.stringify(d);
        fs.writeFile('./input_files/json/student_with_tp_sl_58.json', json, 'utf8', function readFileCallback(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);

            }
        });

    }

}

function read(path, id) {
    return new Promise(resolve => {
        csv
            .fromPath(path)
            .on("data", function (data) {
                if (data[0] == 'Closed position') {
                    
                    if (data[15] != '0' || data[16] != '0') {
                        list[id] = true;
                    }

                }
            })
            .on("end", function () {
                console.log(path);
                resolve(list);
                
            });
    });
}

run();