class Order {
    constructor(type, ticket, symbol, lots, buy_or_sell,open_price,close_price,open_time,close_time,open_date,close_date,profit,swap,commission,net_profit,t_n_p, s_n_l,pips,result,trade_duration,magic_number,order_comment,account
    ) {
        this.Type = type;
        this.Ticket = ticket; 
        this.Symbol = symbol;
        this.Lots = lots;
        this.BuyOrsell = buy_or_sell;
        this.OpenPrice = open_price;
        this.ClosePrice = close_price; 
        this.OpenTime = open_time; 
        this.CloseTime = close_time; 
        this.OpenDate = open_date;
        this.CloseDate = close_date;
        this.Profit = profit; 
        this.Swap = swap;
        this.Commission = commission; 
        this.NetProfit = net_profit; 
        this.TnP = t_n_p;
        this.SnL = s_n_l;
        this.Pips = pips; 
        this.Result = result;
        this.TradeDuration = trade_duration;
        this.MagicNumber = magic_number;
        this.OrderComment = order_comment;
        this.Account = account;
    }
}

module.exports = Order;

// var order = new Order();

