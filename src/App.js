import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//componets
import Navbar from "./components/Navbar";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: '#f27573',
        main: '#ef5350',
        dark: '#a73a38',
        contrastText: '#fff'
      },
      secondary: {
        light: '#6573c3',
        main: '#3f51b5',
        dark: '#2c387e',
        contrastText: '#fff'
      },
    },
  }
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
