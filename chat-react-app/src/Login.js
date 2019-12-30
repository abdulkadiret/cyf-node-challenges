import React, { Component } from "react";
import "./Login.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isError: false,
    message: ""
  };

  onLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      const url = "/api/users/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.success) {
            localStorage.setItem("user", res.data.name);
            localStorage.setItem(
              "signedInUserId",
              res.signedIn.signed_in_user_id
            );
            localStorage.setItem("userId", res.data.user_id);

            swal({
              title: res.message,
              text: "Redirecting...",
              icon: "success",
              timer: 1500,
              buttons: false
            }).then(() => {
              window.location.href = "/";
            });
          } else {
            this.setState({
              isError: true,
              message: res.message
            });
          }
        })
        .catch(error => {
          this.setState({
            isError: true,
            message: this.state.message
          });
        });
    }
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { isError } = this.state;
    return (
      <div className="app">
        <div className="app-login">
          <form onSubmit={this.onLogin}>
            <div>
              <input
                className="login"
                name="email"
                placeholder="email"
                type="email"
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <input
                className="login"
                name="password"
                placeholder="password"
                type="password"
                onChange={this.handleInputChange}
              />
            </div>
            {isError ? (
              <div className="text-danger">{this.state.message}</div>
            ) : null}
            <Button name="Login" />
            <br />
            <p>
              If you don't have an account <Link to="/signup">click here</Link>{" "}
              to creat an account
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
