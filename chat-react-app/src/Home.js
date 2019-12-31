import React, { Component } from "react";
import "./App.css";
import Input from "./Input";
import UsersPanel from "./UsersPanel";
import MessagesList from "./MessagesList";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }

  handleLogout = () => {
    const signedInUserId = localStorage.getItem("signedInUserId");
    const url = `/api/users/signed-in/${signedInUserId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("signedInUserId", "");
        window.location.href = "/login";
      })
      .catch(error => {
        this.setState({
          isError: true
        });
      });
  };

  render() {
    const user = localStorage.getItem("user");
    return (
      <div className="app">
        <div className="app-header">
          <h1>
            <strong>W</strong>
            <small>ee</small>
            <strong>C</strong>
            <small>hat</small>
          </h1>
          {user ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleLogout}
              style={{ position: "absolute", top: "20px", right: "20px" }}
            >
              Logout
            </button>
          ) : null}
        </div>
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <div className="chat-app">
            <MessagesList />
            <Input user={user} />
            <UsersPanel />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
// className="app-title"
