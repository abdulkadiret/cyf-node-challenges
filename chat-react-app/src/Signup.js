import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import Button from "./Button";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const { name, email, password } = this.state;
    if (name && email && password) {
      const url = "/api/users";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })
        .then(res => res.json())
        .then(data => {
          console.log("data of signup", data);
          if (data && data[0] && data[0].user_id) {
            window.location.href = "/login";
          }
        });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="app-login">
          <label>Create Account</label>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                className="signup"
                name="name"
                placeholder="Full name"
                type="text"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                className="signup"
                name="email"
                placeholder="email"
                type="email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                className="signup"
                name="password"
                placeholder="password"
                type="password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <Button name="Sign up" />
            <br />
            <p>
              If you have an account <Link to="/login">click here</Link> to go
              to the login page
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
