import React, { Component } from "react";
import { stock } from "../resources/stock";
import { NavLink } from "react-router-dom";
class StockRow extends Component {
  changeStyle() {
    return {
      color: this.state.dollar_change > 0 ? "#4caf50" : "#e53935",
      fontSize: "0.8rem",
      marginLeft: 5,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      date: null,
      time: null,
      dollar_change: null,
      percent_change: null,
      ticker: null,
    };
  }

  applyData(data) {
    const formattedPirce = data.price === undefined ? null : data.price;
    console.log(data);
    this.setState({
      price: formattedPirce,
      date: data.date,
      time: data.time,
    });
    stock.getYesterdaysClose(this.props.ticker, data.date, (yesterday) => {
      const dollar_change = (data.price - yesterday.price).toFixed(2);
      const percent_change = (data.price / yesterday.price).toFixed(1);
      this.setState({
        dollar_change: `${dollar_change}`,
        percent_change: `(${percent_change}%)`,
        ticker: this.props.ticker,
      });
    });
  }

  componentDidMount() {
    stock.latestPrice(this.props.ticker, this.applyData.bind(this));
  }

  render() {
    return (
      <NavLink
        to={{
          pathname: `/stock/${this.props.ticker}`,
        }}
      >
        <li className="list-group-item align-self-left">
          <b>{this.props.ticker}</b> ${this.state.price}
          <span className="change" style={this.changeStyle()}>
            {this.state.dollar_change}
            &nbsp;{this.state.percent_change}
          </span>
        </li>
      </NavLink>
    );
  }
}

export default StockRow;
