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

  changeToEditMode = (e, editModeId) => {
    e.preventDefault();
    console.log("chnageTOOOEDIT");
    this.setState({
      isInEditMode: true,
      editModeId
    });
  };

  cancelEditMode = () => {
    console.log("cancelEditMode");
    this.setState({
      isInEditMode: false
    });
  };

  changeEditMode = (e, editModeId) => {
    console.log("changeEditMode");
    if (this.state.isInEditMode && !this.state.input) {
      // TODO handle error message for the user
      return;
    }
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

  // getMessageByMessageId = messageId => {
  //   // const { message } = this.state;
  //   const url = `http://localhost:3002/api/messages/${messageId}`;
  //   fetch(url)
  //     .then(res => {
  //       res.json();
  //     })
  //     .then(data => {
  //       console.log("getMessageByMessageId", data);
  //       this.setState({ message: data.message });
  //     })
  //     .catch(error => console.error(error));
  // };

  handleEditMessage = (e, messageId) => {
    e.preventDefault();
    const { input } = this.state;
    console.log(input);
    const url = `http://localhost:3002/api/messages/${messageId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({ message: this.getMessageByMessageId() })
      body: JSON.stringify({ message: input })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    this.onLoadMessages();
  };

  handleEditMessageInputChanges = e => {
    this.setState({
      input: e.target.value
    });
  };

  scrollToEnd() {
    if (this.messagesEnd.current !== null) {
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
                <div className="bubble">
                  {isInEditMode && message.message_id === editModeId ? (
                    <form className="input-group">
                      <textarea
                        id="editTextarea"
                        className="form-control"
                        autoFocus
                        onFocus={(this.defaultValue = this.onChange)}
                        rows="4"
                        // rows-max="45"
                        type="text"
                        spellCheck="true"
                        defaultValue={message.message}
                        onChange={this.handleEditMessageInputChanges}
                        autoComplete="off"
                      ></textarea>
                      <span
                        // className="input-group"
                        style={{ display: "block" }}
                      >
                        <button
                          type="button"
                          onClick={this.cancelEditMode}
                          className="btn-outline-danger ml-1"
                          style={{
                            display: "inline-block",
                            float: "right"
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                        <button
                          type="button"
                          onClick={e =>
                            this.changeEditMode(e, message.message_id)
                          }
                          className="btn-outline-success ml-0"
                          style={{
                            display: "inline-block",
                            float: "right",
                            position: "relative"
                          }}
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      </span>
                    </form>
                  ) : (
                    message.message
                  )}

                  {JSON.parse(userId) === message.user_id ? (
                    <span style={{ display: "block" }}>
                      <button
                        className="btn btn-link p-0 ml-1 mr-1"
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
                        className="btn btn-link p-0 ml-0 mr-1"
                        style={{
                          display: "block",
                          float: "right"
                        }}
                        onClick={e =>
                          this.changeToEditMode(e, message.message_id)
                        }
                      >
                        {isInEditMode &&
                        message.message_id === editModeId ? null : (
                          <i className="fa fa-pencil-square-o fa-lg"></i>
                        )}
                      </button>
                    </span>
                  ) : null}
                </div>
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
