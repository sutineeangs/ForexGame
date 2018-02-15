class ForexGame {

    constructor(student_id, port) {
        this.student_id = student_id;
        this.port = port;

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
        for (var i = 0; i < this.port.length; i++) {
            // console.log("Closed order No.", i);
            if (i != 0) {   //check header

                if (this.port[i].Type == "Closed position") {
                    //[count realized]
                    if (this.port[i].Result == 'Win') {
                        //Win
                        this.RG++;
                    } else {
                        //Loss
                        this.RL++;
                    }

                    //[count unrealized]
                    var n_unrealized = 0
                    for (var j = i + 1; j < this.port.length; j++) {

                        if (Date.parse(this.port[j].OpenTime) < Date.parse(this.port[i].CloseTime) &&
                            Date.parse(this.port[i].CloseTime) < Date.parse(this.port[j].CloseTime)) {
                            console.log('No.', i, '||', 'No.', j);
                            n_unrealized++;
                        }
                    }

                    console.log('n_unrealized=', n_unrealized);


                }
            }
        }


        console.log('RG=', this.RG, ' RL=', this.RL);


    }
}




module.exports = ForexGame;

// var game = new ForexGame();
// game.checkPort();
