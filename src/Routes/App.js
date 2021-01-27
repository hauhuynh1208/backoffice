import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "./index";
import NotFound from "../Pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
        })}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
