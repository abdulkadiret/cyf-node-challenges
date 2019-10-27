import React, { Component } from "react";

class Login extends Component {
  login = e => {
    e.preventDefault();
    this.props.setUsername(e.target.logInName.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <label>
            <strong>Username</strong>
          </label>
          <br />
          <input
            id="logInName"
            placeholder="Enter Your name..."
            type="text"
          ></input>
          <br />
          <button type="submit" className="btn btn-primary m-2">
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
