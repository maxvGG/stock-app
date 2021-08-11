import Stock from "./components/plotly/plotly";
import "./App.css";
import React from "react";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

// ik wil hier in de home page maken dus niet in component home maar hier en dan een link naar /stock met de stock name die ik uit een andere api haal

function App() {
  return (
    <Router>
      <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
      <div className="App">
        {/* <NavLink to="/stock">stocks</NavLink> */}
        <Route path="/stock/:ticker" component={Stock}></Route>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
