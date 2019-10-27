import React, { Component } from "react";
// import Button from "./Button";
import "./input.css";

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

  postTheInputText = e => {
    e.preventDefault();
    const url = "http://localhost:3002/messages";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // id: 34,
        from: this.props.username,
        text: this.state.input
      })
    })
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 400) {
          alert("write an input message");
        } else if (res.status === 401) {
          alert("Message should be at last three characters");
        } else {
          alert("Please try again");
        }
      })
      .then(data => {
        this.props.onSentMessage();
        this.setState({
          input: ""
        });
      })
      .catch(error => console.log("Error", "input a message"));
  };

  render() {
    return (
      <form
        className="input-form"
        onSubmit={this.postTheInputText}
        type="submit"
      >
        <input
          scrolling="no"
          className="text-input scroll "
          type="text"
          name="chatText"
          value={this.state.input}
          placeholder="Write your message... and hit ENTER"
          onChange={this.handleChange}
        />
        {/* <button>send</button> */}
      </form>
    );
  }
}

export default Form;
