import React, { Component } from "react";
import "./MessagesList.css";

class MessagesList extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      doScroll: true
    };
    this.messagesEnd = React.createRef();
    setInterval(this.onLoadMessages, 500);
  }

  handleOnSentMessage = () => {
    this.onLoadMessages();
  };

  onLoadMessages = () => {
    const url = "http://localhost:3002/api/messages";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let onNewMessageAdd = this.state.messages.length !== data.length;
        data = data.sort((a, b) => {
          return a.message_id - b.message_id;
        });
        this.setState({ messages: data, doScroll: onNewMessageAdd });
      });
  };

  componentDidMount() {
    this.onLoadMessages();
  }

  componentDidUpdate() {
    if (this.state.doScroll) {
      this.scrollToEnd();
      this.setState({ doScroll: false });
    }
  }

  handleDeleteMessage = messageId => {
    const url = `http://localhost:3002/api/messages/${messageId}`;
    fetch(url, {
      method: "DELETE"
    });
    this.onLoadMessages();
  };

  editMessage = e => {
    e.stopPropagation();
    let messages = this.state.messages;
    let editedId = e.target.id.split("-")[1];
    let offset = messages.findIndex(elem => elem.id === editedId);
    messages[offset].inEditMode = true;
    this.setState({
      messages: messages
    });
  };

  handleUpdateMessage = (e, messageId) => {
    e.stopPropagation();
    // let editedId = e.target.id.split("-")[1];
    // console.log("edit id was", e.target.id, "but we made it into", editedId);
    const url = `http://localhost:3002/api/messages/${messageId}`;
    // const oldMessage = this.state.messages.find(elem => elem.id === editedId);
    const userId = localStorage.getItem("userId");
    let newMessage = {
      userId,
      message: e.target.value
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    });
    this.onLoadMessages();
  };

  handleClick = e => {
    let messages = this.state.messages;
    // if a message is being edited, don't allow any other messages
    // to be edited or deleted until it's finished
    if (messages.some(m => m.inEditMode)) return;
    // let offset = messages.findIndex(elem => elem.id === e.target.id);
    // let showButtons = !messages[offset].showButtons;
    // messages.forEach(message => (message.showButtons = false));
    // messages[offset].showButtons = showButtons;
    this.setState({
      messages: messages
    });
  };

  editKeyDown = e => {
    // Update the message only when we hit enter.
    if (e.keyCode === 13) {
      this.handleUpdateMessage(e);
    }
  };

  scrollToEnd() {
    console.log("called scrollToEnd");
    if (this.messagesEnd.current !== null) {
      console.log("found messagesEnd");
      this.messagesEnd.current.scrollIntoView({
        behaviour: "smooth"
      });
    }
  }

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <div>
        <ul className="messages">
          {this.state.messages.map((message, index) => {
            return (
              <li key={index}>
                <div className="sender">{message.name}</div>
                <p
                  // onClick={this.handleClick}
                  className="bubble"
                  // id={message.id}
                >
                  {message.message}
                  {/* {message.inEditMode ? (
                    <input
                      autoFocus
                      type="text"
                      defaultValue={message.text}
                      style={{ width: "100%" }}
                      onClick={e => e.stopPropagation()}
                      onKeyDown={this.editKeyDown}
                      id={"input-" + message.id}
                    />
                  ) : (
                  
                  )} */}

                  {JSON.parse(userId) === message.user_id ? (
                    <span style={{ display: "block" }}>
                      <button
                        className="link-button"
                        style={{ display: "inline-block", float: "right" }}
                        onClick={() =>
                          window.confirm(
                            "Are you sure you wish to delete this message?"
                          ) && this.handleDeleteMessage(message.message_id)
                        }
                      >
                        <i className="fa fa-trash fa-lg"></i>
                      </button>
                      <button
                        className="link-button"
                        style={{
                          display: "inline-block",
                          float: "right",
                          marginRight: "10px"
                        }}
                        onClick={this.editMessage}
                        id={"edit-" + message.id}
                      >
                        <i className="fa fa-pencil-square-o fa-lg"></i>
                      </button>
                    </span>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ul>
        <div ref={this.messagesEnd}></div>
      </div>
    );
  }
}

export default MessagesList;
