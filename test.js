const CSVFile = require('./csv_file.js');
const ForexGame = require('./forex_game.js');

async function test() {
    console.log('calling');
    var currency_all = {};

    var csv_file_test = new CSVFile();
    // csv_file_test.write('./output_files/output.csv');

    var currency_filepath = "./input_files/real_account_EURUSD_D1.csv";
    var currency_filename = currency_filepath.split('/').pop();
    var currency_ls = currency_filename.split('_');
    var currency_name = currency_ls[2];     
    var currency = await csv_file_test.read_currency_file(currency_name, currency_filepath);
    currency_all[currency_name] = currency;
    // console.log(currency_all['EURUSD']['2011.04.20']);
    

    var port_filepath = "./input_files/5602686445.csv";
    var port_filename = port_filepath.split('/').pop();
    var account_ls = port_filename.split('.');
    var account_no = account_ls[0];
    var orders = await csv_file_test.read_order_file(port_filepath);

    // console.log(orders[0]);
    // console.log(orders[218].OpenTime.getHours());
    // var forex_game = new ForexGame('5602686445', orders);
    // var res = forex_game.checkPort();


}

test();
