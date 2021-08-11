import React from "react";
import Plot from "react-plotly.js";
import { alphavantage } from "../../config/alphavantage";
import { Link } from "react-router-dom";
class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      StockSymbol: this.props.ticker,
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    let API_CALL = `${alphavantage.base_url}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.props.match.params.ticker}&outputsize=compact&apikey=${alphavantage.api_token}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Stock</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{
            width: 720,
            height: 440,
            title: this.props.match.params.ticker,
          }}
        />
        <Link to="/">go home</Link>
      </div>
    );
  }
}

export default Stock;
