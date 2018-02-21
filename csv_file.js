const Order = require('./order.js');
const Currency = require('./currency.js');

class CSVFile {

    constructor() {
        this.fs = require('fs');
        this.csv = require('fast-csv');
    }

    read_order_file(filepath) {
        return new Promise(resolve => {

            var list = [];

            var stream = this.fs.createReadStream(filepath);
            var csvStream = this.csv
                .parse()
                .on("data", function (data) {

                    if (data[0] == "Closed position") {

                        list.push(new Order(
                            data[0], data[1], data[2], data[3], data[4],
                            data[5], data[6], data[7], data[8], data[9],
                            data[10], data[11], data[12], data[13], data[14],
                            data[15], data[16], data[17], data[18], data[19],
                            data[20], data[21], data[22]
                        ));
                    }


                })
                .on("end", function () {
                    console.log(">>>>> Read orders file");
                    console.log("Input file: ", filepath);
                    console.log('The Number of Lines: ', list.length);
                    console.log("Read csv file: Done!");
                    resolve(list);
                });

            stream.pipe(csvStream);
        });

    }

    read_currency_file(currency_name, filepath) {
        return new Promise(resolve => {

            var list = {};
            var stream = this.fs.createReadStream(filepath);
            var csvStream = this.csv
                .parse()
                .on("data", function (data) {

                    // console.log(data);

                    if (data[0] != '' && data[0] != null) {
                        var str = data[0].split('.');
                        var y = str[0];
                        var m = str[1];
                        var d = str[2];
                        var new_d = m + '/' + d + '/' + y;
                        var key = data[0] + ' ' + data[1];
                        // console.log(key);

                        list[key] = new Currency(currency_name, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
                    }

                })
                .on("end", function () {
                    // console.log(">>>>> Read currency file");
                    // console.log("Input file: ", filepath);
                    // console.log("Read csv file: Done!");
                    // console.log(list);
                    resolve(list);
                });

            stream.pipe(csvStream);
        });

    }

    write(filepath, body) {

        // var ws = this.fs.createWriteStream(filepath);
        // this.csv
        //     .write(body, { headers: true })
        //     .pipe(ws);

        this.csv
            .writeToPath(filepath, body, { headers: true })
            .on("finish", function () {
                console.log("write done!");
            });

    }
}

module.exports = CSVFile;

// const CSVFile = require('./csv_file.js');
// var csv_file_test = new CSVFile();
// csv_file_test.read('./input_files/5602686445.csv');
// csv_file_test.write('./output_files/output.csv');

