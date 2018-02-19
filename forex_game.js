class ForexGame {

    constructor(student_id, port) {
        this.student_id = student_id;
        this.port = port;
        this.currency_all = require('./input_files/json/currency.json');

        this.RG = 0;
        this.RL = 0;

        this.UG = 0;
        this.UL = 0;

        this.PGR = 0;
        this.PLR = 0;

    }


    calPLR() {
        this.PLR = this.RL / (this.RL + this.UL);
    }

    calPGR() {
        this.PGR = this.RG / (this.RG + this.UG);
    }

    checkPort() {
        return new Promise(resolve => {

            var n_unrealized = 0

            for (var i = 0; i < this.port.length; i++) {
                if (i != 0) {   //check header

                    if (this.port[i].Type == "Closed position" && this.port[i].OrderComment != '[tp]' && this.port[i].OrderComment != '[sl]' && this.port[i].OrderComment != '[stopout]') {
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

                                if (Date.parse(this.port[j].OpenTime) < Date.parse(this.port[i].CloseTime) &&
                                    Date.parse(this.port[i].CloseTime) < Date.parse(this.port[j].CloseTime) &&
                                    this.port[j].OrderComment != '[tp]' && this.port[j].OrderComment != '[sl]' && this.port[j].OrderComment != '[stopout]') {
                                    // console.log('No.', i, this.port[i].Symbol, '||', 'No.', j, this.port[j].Symbol, '||', 'Buy');


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

                                    if (this.currency_all[date_time_ur]) {

                                        var currency = this.currency_all[date_time_ur];
                                        var high_price = currency.High;
                                        var low_price = currency.Low;

                                        //check buy/sell
                                        if (this.port[j].BuyOrSell == 'Buy') {
                                            //buy
                                            // console.log('No.', i+2, '||', 'No.', j+2, '||', date_time_ur,'Buy');
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
                                            // console.log('No.', i+2, '||', 'No.', j+2, '||',date_time_ur, 'Sell');
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
            }

            this.calPGR();
            this.calPLR();
            // console.log(this.student_id, this.RG, this.RL, this.UG, this.UL, this.PGR, this.PLR);
            resolve([this.student_id, this.RG, this.RL, this.UG, this.UL, this.PGR.toFixed(4), this.PLR.toFixed(4)]);
        });
    }
}




module.exports = ForexGame;

// var game = new ForexGame();
// game.checkPort();
