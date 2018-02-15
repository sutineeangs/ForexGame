const CSVFile = require('./csv_file.js');
const ForexGame = require('./forex_game.js');

async function test() {
    console.log('calling');
    var csv_file_test = new CSVFile();
    // csv_file_test.write('./output_files/output.csv');
    var data = await csv_file_test.read('./input_files/5602686445.csv');
    // console.log(data);

    var forex_game = new ForexGame('5602686445', data);
    var res = forex_game.checkPort();

}

test();
