import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login/Login";
import States from "./States/States";
import Countries from "./Countries/Countries";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="auth-wrapper">
          <div className="auth-inner"> */}
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
        {/* </div>
        </div> */}
        {/* <div className="auth-wrapper"> */}
        {/* <div className="auth-inner"> */}
        <Switch>
          <Route path="/signed-in" exact component={Countries} />
          <Route path="/signed-in/:id/:name" exact component={States} />
        </Switch>
        {/* </div> */}
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
