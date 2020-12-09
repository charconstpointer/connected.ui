import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home'
import Groups from './components/Groups'
import Navigation from './components/Navigation'
import UserPanel from './components/UserPanel'
import Contact from './components/Contact'

function App() {
  return (
    <div className="container p-5">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/groups"} component={Groups} />
          <Route exact path={"/contact"} component={Contact} />
          <Route exact path={"/login"} component={UserPanel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
