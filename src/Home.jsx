import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import StockRow from './components/StockRow.js'
import {NavLink} from "react-router-dom";
class Home extends React.Component {
       constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
          this.setState({ value: event.target.value });
      }
    
    render() {
        return (
            <div>
                <div className="container">
                    <form >
                        <input type="text" onChange={this.handleChange} />
                        <NavLink to={`/stock/${this.state.value}`}>
                            <button>Search</button>
                        </NavLink>
                        
                    </form>
                    <div className="col-md-4 mt-5">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <StockRow ticker='AAPL' />
                                <StockRow ticker='GOOG' />
                                <StockRow ticker='MSFT' />
                                <StockRow ticker='AMZN'/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home