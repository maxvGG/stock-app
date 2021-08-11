import { iex } from "../config/iex";

export const stock = {
  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => callback(stock.formatPriceData(data)));
  },
  // &exactDate=20210604
  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },

  formatPriceData: (data) => {
    const stockData = data[data.length - 1];
    const formattedData = {};
    formattedData.price = stockData.close;
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;
    return formattedData;
  },

  getYesterdaysClose: (ticker, date, callback) => {
    stock.getLastTradingDate(date).then((data) => {
      fetch(stock.YesterdaysCloseURL(ticker, data[0].date))
        .then((response) => response.json())
        .then(() => callback(stock.formatPriceData(data)));
    });
  },

  getLastTradingDate: (date) => {
    var today = stock.formatedate(date);
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;

    return fetch(url).then((res) => res.json());
  },

  YesterdaysCloseURL: (ticker, date) => {
    var LastTradingDate = stock.formatedate(date);
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${LastTradingDate}&token=${iex.api_token}`;
  },
  formatedate: (date) => {
    return new Date(date).toISOString().split("T")[0].replace(/-/g, "");
  },
};
