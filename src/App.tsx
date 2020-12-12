import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home'
import Groups from './components/Groups'
import Navigation from './components/Navigation'
import UserPanel from './components/UserPanel'
import Contact from './components/Contact'
import Group from './components/Groups/Group'
import User from './components/Users/User'

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
          <Route exact path={"/groups/:id"} component={Group} />
          <Route exact path={"/users/:username"} component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
