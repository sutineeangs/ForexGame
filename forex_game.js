class ForexGame {

    constructor(student_id, port) {
        this.student_id = student_id;
        this.port = port;
        this.currency_all = require('./input_files/json/currency.json');
        // this.student_on_class = require('./input_files/json/student_on_class_58.json');

        this.RG = 0;
        this.RL = 0;

        this.UG = 0;
        this.UL = 0;

        this.PGR = 0;
        this.PLR = 0;

        this.pipMaker = new RegExp("^(PipMaker)");
        this.so = new RegExp("^(so:)");


    }


    calPLR() {
        var res = this.RL / (this.RL + this.UL);

        if (isNaN(res)) {
            this.PLR = 0;
        } else {
            this.PLR = res;
        }

    }

    calPGR() {
        var res = this.RG / (this.RG + this.UG);
        if (isNaN(res)) {
            this.PGR = 0;
        } else {
            this.PGR = res;
        }
    }

    checkPort() {
        return new Promise(resolve => {

            var n_unrealized = 0;
            // console.log(this.port);

            for (var i = 0; i < this.port.length; i++) {

                var check_pip_r = this.pipMaker.test(this.port[i].OrderComment);
                var check_so_r = this.so.test(this.port[i].OrderComment);

                if (this.port[i].Type == "Closed position" &&
                    this.port[i].OrderComment != '[tp]' && this.port[i].OrderComment != '[sl]' && this.port[i].OrderComment != '[stopout]' &&
                    this.port[i].OrderComment != 'tp' && this.port[i].OrderComment != 'sl' && this.port[i].OrderComment != 'stopout' &&
                    check_pip_r == false && check_so_r == false) {
                    // if(this.port[i].OrderComment != '[tp]' && this.port[i].OrderComment != '[sl]' && this.port[i].OrderComment != '[stopout]'){

                    // }
                    var currency_name_r = this.port[i].Symbol;
                    var d_r = this.port[i].CloseTime;

                    var month_r = d_r.getMonth() + 1;
                    if (month_r >= 0 && month_r <= 9) {
                        month_r = "0" + month_r;
                    } else {
                        month_r = "" + month_r;
                    }

                    var date_r = d_r.getDate();
                    if (date_r >= 0 && date_r <= 9) {
                        date_r = "0" + date_r;
                    } else {
                        date_r = "" + date_r;
                    }

                    var year_r = d_r.getFullYear();
                    var hour_r = d_r.getHours();
                    if (hour_r >= 0 && hour_r <= 9) {
                        hour_r = "0" + hour_r;
                    } else {
                        hour_r = "" + hour_r;
                    }

                    var date_time_r = currency_name_r + ' ' + year_r + '.' + month_r + '.' + date_r + ' ' + hour_r + ':00';
                    // console.log("Closed order No.", i, this.port[i].Type, this.port[i].CloseTime, this.port[i].CloseTime.getHours());


                    if (this.currency_all[date_time_r]) {
                        // console.log(currency_name_r);

                        //[count realized]
                        if (this.port[i].Result == 'Win') {
                            //Win
                            this.RG++;
                        }
                        if (this.port[i].Result == 'Loss') {
                            //Loss
                            this.RL++;
                        }

                        //[count unrealized]
                        for (var j = i + 1; j < this.port.length; j++) {

                            var check_pip_ur = this.pipMaker.test(this.port[j].OrderComment);
                            var check_so_ur = this.so.test(this.port[j].OrderComment);
                            // console.log(Date.parse(this.port[j].OpenTime), Date.parse(this.port[i].CloseTime), Date.parse(this.port[j].CloseTime));
                            
                            if (Date.parse(this.port[j].OpenTime) < Date.parse(this.port[i].CloseTime) &&
                                Date.parse(this.port[i].CloseTime) < Date.parse(this.port[j].CloseTime) &&
                                this.port[j].OrderComment != '[tp]' && this.port[j].OrderComment != '[sl]' && this.port[j].OrderComment != '[stopout]' &&
                                this.port[j].OrderComment != 'tp' && this.port[j].OrderComment != 'sl' && this.port[j].OrderComment != 'stopout' &&
                                check_pip_ur == false && check_so_ur == false) {


                                var open_price = this.port[j].OpenPrice;

                                var currency_name_ur = this.port[j].Symbol;

                                var d_ur = this.port[i].CloseTime;

                                var month_ur = d_ur.getMonth() + 1;
                                if (month_ur >= 0 && month_ur <= 9) {
                                    month_ur = "0" + month_ur;
                                } else {
                                    month_ur = "" + month_ur;
                                }

                                var date_ur = d_ur.getDate();
                                if (date_ur >= 0 && date_ur <= 9) {
                                    date_ur = "0" + date_ur;
                                } else {
                                    date_ur = "" + date_ur;
                                }

                                var year_ur = d_ur.getFullYear();
                                var hour_ur = d_ur.getHours();
                                if (hour_ur >= 0 && hour_ur <= 9) {
                                    hour_ur = "0" + hour_ur;
                                } else {
                                    hour_ur = "" + hour_ur;
                                }

                                var date_time_ur = currency_name_ur + ' ' + year_ur + '.' + month_ur + '.' + date_ur + ' ' + hour_ur + ':00';


                                var c_d_ur = this.port[j].CloseTime;

                                var c_month_ur = c_d_ur.getMonth() + 1;
                                if (c_month_ur >= 0 && c_month_ur <= 9) {
                                    c_month_ur = "0" + c_month_ur;
                                } else {
                                    c_month_ur = "" + c_month_ur;
                                }

                                var c_date_ur = c_d_ur.getDate();
                                if (c_date_ur >= 0 && c_date_ur <= 9) {
                                    c_date_ur = "0" + c_date_ur;
                                } else {
                                    c_date_ur = "" + c_date_ur;
                                }

                                var c_year_ur = c_d_ur.getFullYear();
                                var c_hour_ur = c_d_ur.getHours();
                                if (c_hour_ur >= 0 && c_hour_ur <= 9) {
                                    c_hour_ur = "0" + c_hour_ur;
                                } else {
                                    c_hour_ur = "" + c_hour_ur;
                                }

                                var c_date_time_ur = currency_name_ur + ' ' + c_year_ur + '.' + c_month_ur + '.' + c_date_ur + ' ' + c_hour_ur + ':00';


                                if (this.currency_all[date_time_ur] && this.currency_all[c_date_time_ur]) {

                                    var currency = this.currency_all[date_time_ur];
                                    var high_price = currency.High;
                                    var low_price = currency.Low;

                                    //check buy/sell
                                    if (this.port[j].BuyOrSell == 'Buy') {
                                        //buy
                                        // console.log('No.', i, '||', 'No.', j, '||', date_time_ur, 'Buy');
                                        // console.log(open_price, high_price, low_price);

                                        //UG
                                        //UL
                                        //not count
                                        if (high_price > open_price && low_price > open_price) {
                                            this.UG++;
                                            // n_unrealized++;
                                            // console.log('UG');

                                        }
                                        if (high_price < open_price && low_price < open_price) {
                                            this.UL++;
                                            // n_unrealized++;
                                            // console.log('UL');

                                        }

                                    }
                                    if (this.port[j].BuyOrSell == 'Sell') {
                                        //sell
                                        // console.log('No.', i, '||', 'No.', j, '||', date_time_ur, 'Sell');
                                        // console.log(open_price, high_price, low_price);

                                        //UG
                                        //UL
                                        //not count
                                        if (high_price > open_price && low_price > open_price) {
                                            this.UL++;
                                            // n_unrealized++;
                                            // console.log('UL');
                                        }
                                        if (high_price < open_price && low_price < open_price) {
                                            this.UG++;
                                            // n_unrealized++;
                                            // console.log('UG');
                                        }

                                    }


                                } else {
                                    // console.log(date_time_ur);

                                }


                            } else {
                                // console.log('t', );

                            }
                        }

                        // console.log('n_unrealized=', n_unrealized, this.UG,this.UL);


                    } else {
                        // console.log(date_time_r);
                    }

                }
            }

            this.calPGR();
            this.calPLR();
            console.log(this.student_id, this.RG, this.RL, this.UG, this.UL, this.PGR, this.PLR);
            resolve([this.student_id,this.RG, this.RL, this.UG, this.UL, this.PGR.toFixed(4), this.PLR.toFixed(4)]);
            // resolve([this.student_id,this.student_on_class[this.student_id],this.RG, this.RL, this.UG, this.UL, this.PGR.toFixed(4), this.PLR.toFixed(4)]);
        });
    }
}




module.exports = ForexGame;

// var game = new ForexGame();
// game.checkPort();
