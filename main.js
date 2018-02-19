const CSVFile = require('./csv_file.js');
const ForexGame = require('./forex_game.js');

async function run(){
    var fs = require('fs');
    var csv_file = new CSVFile();
    // var currency_all = require('./input_files/json/currency.json');
    // console.log(json);
    // console.log(json["EURUSD 2015.10.29 09:00"]);

    //Read port files
    var port_directory = "./input_files/ports2/";
    var port_files = fs.readdirSync(port_directory);
    console.log(port_files);
    console.log(port_files.length);

    var output = [];
    output.push(["studentID", "RG", "RL", "UG", "UL", "PGR", "PLR"]);

    for (var j = 0; j < port_files.length; j++) {
        var port_filepath = port_directory + port_files[j];
        var port_filename = port_filepath.split('/').pop();
        var account_ls = port_filename.split('.');
        var account_no = account_ls[0];
        var orders = await csv_file.read_order_file(port_filepath);
        // console.log(orders[0]);
        // console.log(orders[1]);
        var forex_game = new ForexGame(account_no, orders);
        // console.log(forex_game.currency_all["EURUSD 2015.10.29 09:00"]);
        
        var data = await forex_game.checkPort();
        output.push(data);
        
    }

    // console.log(output);
    csv_file.write('./output_files/output.csv', output);

    
    
}

//node --max_old_space_size=4096 .\main.js
run();
