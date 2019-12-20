import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

// check whether the component require login
const auth = Component => {
  return () => {
    const user = localStorage.getItem("signedInUserId");
    const isLoggedIn = user;
    if (isLoggedIn) {
      return <Component />;
    }
    // if the user is not logged redirect to the login page
    return <Redirect to="/login" />;
  };
};

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={auth(Home)} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
};

export default App;
