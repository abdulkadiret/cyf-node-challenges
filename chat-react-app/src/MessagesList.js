import React, { Component } from "react";
import "./MessagesList.css";

class MessagesList extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      doScroll: true,
      isInEditMode: false,
      editModeId: null
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

  changeEditMode = (e, editModeId) => {
    if (this.state.isInEditMode) {
      this.handleEditMessage(e, editModeId);
    }
    this.setState({
      isInEditMode: !this.state.isInEditMode,
      editModeId
    });
  };

  handleDeleteMessage = messageId => {
    const url = `http://localhost:3002/api/messages/${messageId}`;
    fetch(url, {
      method: "DELETE"
    });
    this.onLoadMessages();
  };

  handleEditMessage = (e, messageId) => {
    e.preventDefault();
    const { input } = this.state;
    const url = `http://localhost:3002/api/messages/${messageId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    })
      .then(res => res.json())
      .catch(error => console.error(error));
    this.onLoadMessages();
  };

  handleEditMessageInputChanges = e => {
    this.setState({
      input: e.target.value
    });
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
    const { isInEditMode, editModeId } = this.state;
    return (
      <div>
        <ul className="messages">
          {this.state.messages.map((message, index) => {
            return (
              <li key={index}>
                <div className="sender">{message.name}</div>
                <p className="bubble">
                  {isInEditMode && message.message_id === editModeId ? (
                    <input
                      autoFocus
                      type="text"
                      defaultValue={message.message}
                      onChange={this.handleEditMessageInputChanges}
                    />
                  ) : (
                    message.message
                  )}

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
                        onClick={e =>
                          this.changeEditMode(e, message.message_id)
                        }
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
