import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Dashboard from "./components/dashboard/Dashboard";
import CalorieDashboard from "./components/calorie-counter/CaloriesDashboard";
import WeightTracker from "./components/weight-tracker/WeightTracker";
import Auth from "./components/auth/Auth";
import PrivateRoute from "./components/common/PrivateRoute";
import NavBar from "./components/layout/navbar/NavBar";
const theme = createMuiTheme({
  palette: {
    primary: { main: green[500] },
    secondary: { main: "rgba(0,0,0,0.7)" }
  }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Auth>
            <NavBar>
              <Route exact path="/" component={Dashboard} />
              <PrivateRoute
                exact
                path="/calorie-counter"
                component={CalorieDashboard}
              />
              <PrivateRoute
                exact
                path="/weight-tracker"
                component={WeightTracker}
              />
            </NavBar>
          </Auth>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
