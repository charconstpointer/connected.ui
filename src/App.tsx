import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/home'
import Navigation from './components/navigation'

function App() {
  return (
    <div className="container p-5">
      <Router>
        <Navigation/>
        <Switch>
          <Route exact path={"/"} component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
