import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import ProtectedRoute from "./services/auth/protected-route";
import AuthService from "./services/auth/auth-services";

import Main from "./components/pages/main/Main";
import Login from "./components/pages/login/Login";
import Signup from "./components/pages/signup/Signup";
import SwipeBookshelfs from "./components/pages/swipebookshelfs/SwipeBookshelfs";
import ErrorPage from "./components/pages/error-page/error-page";
import Profile from "./components/pages/profile/Profile";
import Matches from "./components/pages/matches/Matches";
import StartUpFlow from "./components/pages/startupflow/StartUpFlow";
import { CSSTransition, TransitionGroup } from "react-transition-group";


class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (user) => {
    console.log('getTheUser in App.js', user)
    this.setState({
      loggedInUser: user,
    });
  };

  render() {
    this.fetchUser();

    return (
      <div>
        <AnimatedSwitch
          loggedInUser={this.state.loggedInUser}
          getTheUser={this.getTheUser}
        />
        <RegularSwitch 
          loggedInUser={this.state.loggedInUser}
          getTheUser={this.getTheUser} />
      </div>

    );
  }
}

const AnimatedSwitch = withRouter(({ location, loggedInUser, getTheUser }) => {
  const { key = "default" } = location;
  return (
    <TransitionGroup>
      <CSSTransition
        key={key}
        classNames="fade"
        timeout={1000}
      >

        <Switch location={location}>
          <Route exact path="/404" component={ErrorPage} />

          <Route
            exact
            path="/login"
            render={() => <Login getTheUser={getTheUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup getTheUser={getTheUser} />}
          />
         <ProtectedRoute 
            userInSession={loggedInUser} 
            path='/pick-my-books' 
            component={StartUpFlow}
            getTheUser={getTheUser}  /> 
      
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});

const RegularSwitch = withRouter(({ location, loggedInUser, getTheUser }) => {
  return (
    
      <Switch location={location}>
       <Route
            exact
            path="/"
            render={(props) => <Main {...props} userInSession={loggedInUser} getTheUser={getTheUser}/>}
          />
      <ProtectedRoute
            userInSession={loggedInUser}
            path="/find-my-match"
            component={SwipeBookshelfs}
            getTheUser={getTheUser} 
          />
          <ProtectedRoute
            userInSession={loggedInUser}
            path="/profile"
            component={Profile}
            getTheUser={getTheUser}
          />
          <ProtectedRoute
            userInSession={loggedInUser}
            path="/matches"
            component={Matches}
            getTheUser={getTheUser} 
          />
    
        </Switch>
  );
});

export default App;