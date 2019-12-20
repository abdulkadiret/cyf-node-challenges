import React, { Component } from "react";
import "./Input.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = e => {
    const inputMessage = e.target.value;
    this.setState({
      input: inputMessage
    });
  };

  handleMessagePost = e => {
    e.preventDefault();
    if (!this.state.input) return;
    const url = "/api/messages";
    const userId = localStorage.getItem("userId");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        message: this.state.input
      })
    })
      .then(() => {
        this.setState({
          input: ""
        });
      })
      .catch(error => console.log("Error", "input a message"));
  };

  render() {
    return (
      <form
        className="text-submit-form"
        onSubmit={this.handleMessagePost}
        type="submit"
      >
        <input
          scrolling="no"
          className="text-input scroll"
          type="text"
          name="chatText"
          value={this.state.input}
          placeholder="Write your message... and hit ENTER"
          onChange={this.handleChange}
          autoComplete="off"
        />
      </form>
    );
  }
}

export default Form;
