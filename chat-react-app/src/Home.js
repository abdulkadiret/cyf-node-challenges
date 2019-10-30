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
    const url = `http://localhost:3002/api/users/signed-in/${signedInUserId}`;
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
          <h1 className="app-title">WeeApp</h1>
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
            <div className="users-display">
              <h4>Users Display</h4>
            </div>
            <div className="users-panel">
              <UsersPanel />
            </div>
            <div className="messages-board">
              <MessagesList />
            </div>
            <div className="text-area">
              <Input onSentMessage={this.onSentMessage} user={user} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;

// import React, { Component } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import Input from "./Input";
// // import Nav from "./Navbar";
// import Login from "./Login";
// import UsersPanel from "./UsersPanel";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       messages: [],
//       username: null,
//       doScroll: true,
//       users: ["Akey"]
//     };
//     this.messagesEnd = React.createRef();
//     setInterval(this.loadMessages, 500);
//   }

//   onSentMessage = () => {
//     this.loadMessages();
//   };

//   loadMessages = () => {
//     const url = "http://localhost:3002/messages";
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         let newMessageAdded = this.state.messages.length !== data.length;
//         this.setState({ messages: data, doScroll: newMessageAdded });
//       });
//   };

//   componentDidMount() {
//     this.loadMessages();
//   }

//   componentDidUpdate() {
//     if (this.state.doScroll) {
//       this.scrollToEnd();
//       this.setState({ doScroll: false });
//     }
//   }

//   deleteMessage = e => {
//     // this method on the event stops any other onClick
//     // handlers being called - we only want the button
//     // onClick to be called, not the one on the parent
//     // paragraph
//     e.stopPropagation();
//     // we split this into an array like this:
//     // ["delete", 5]
//     // then take the second element with [1]
//     let deleteId = e.target.id.split("-")[1];
//     console.log("delete id was", e.target.id, "but we made it into", deleteId);
//     // let deleteMessage = Chats.find(chat => chat.id === id);
//     // Chats.splice(Chats.indexOf(deleteChat), 1);
//     // res.send(Chats);

//     // let messages = this.state.messages.splice(deleteId, 1);
//     // this.setState({ messages });
//     const url = `http://localhost:3002/messages/${deleteId}`;
//     fetch(url, {
//       method: "DELETE"
//     });
//     this.loadMessages();
//     // .then(res => res.json()) // OR res.text()
//     // .then(res => console.log(res));
//     // .then(data => {
//     //   console.log("Success:", JSON.stringify(data));
//     //   this.onSentMessage();
//     //   this.setState({
//     //     messages: messages
//     //   });
//     // })
//     // .catch(error => console.log("Error", "input a message"));
//   };

//   editMessage = e => {
//     e.stopPropagation();
//     let messages = this.state.messages;
//     let editedId = e.target.id.split("-")[1];
//     let offset = messages.findIndex(elem => elem.id === editedId);
//     messages[offset].inEditMode = true;
//     this.setState({
//       messages: messages
//     });
//   };

//   updateMessage = e => {
//     let editedId = e.target.id.split("-")[1];
//     console.log("edit id was", e.target.id, "but we made it into", editedId);
//     const url = `http://localhost:3002/messages`;
//     const oldMessage = this.state.messages.find(elem => elem.id === editedId);
//     let newMessage = {
//       id: oldMessage.id,
//       from: oldMessage.from,
//       text: e.target.value
//     };

//     fetch(url, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newMessage)
//     });
//     this.loadMessages();
//   };

//   handleClick = e => {
//     let messages = this.state.messages;
//     // if a message is being edited, we don't allow any other messages
//     // to be edited or deleted until it's finished
//     if (messages.some(m => m.inEditMode)) return;
//     let offset = messages.findIndex(elem => elem.id === e.target.id);
//     let showButtons = !messages[offset].showButtons;
//     messages.forEach(message => (message.showButtons = false));
//     messages[offset].showButtons = showButtons;
//     this.setState({
//       messages: messages
//     });
//   };

//   editKeyDown = e => {
//     // Update the message only when we hit enter.
//     if (e.keyCode === 13) {
//       this.updateMessage(e);
//     }
//   };

//   setUsername = username => {
//     console.log(username);
//     this.setState({ username });
//   };

//   scrollToEnd() {
//     console.log("called scrollToEnd");
//     if (this.messagesEnd.current !== null) {
//       console.log("found messagesEnd");
//       this.messagesEnd.current.scrollIntoView({
//         behaviour: "smooth"
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="app">
//         <div className="app-header">
//           <h1>CYF Chat App</h1>
//         </div>
//         {!this.state.username ? (
//           <div className="app-login">
//             <Login setUsername={this.setUsername} />
//           </div>
//         ) : (
//           <div className="chat-app">
//             <div className="users-panel">
//               <h4 className="us-dis">Users Display</h4>
//               <UsersPanel users={this.state.users} />
//             </div>
//             <div className="message-board">
//               <ul className="messages">
//                 {this.state.messages.map((message, index) => (
//                   <li key={message.id}>
//                     <h4>{message.from}</h4>
//                     <p
//                       onClick={this.handleClick}
//                       className="card"
//                       id={message.id}
//                     >
//                       {message.inEditMode ? (
//                         <input
//                           autoFocus
//                           type="text"
//                           defaultValue={message.text}
//                           style={{ width: "100%" }}
//                           onClick={e => e.stopPropagation()}
//                           onKeyDown={this.editKeyDown}
//                           id={"input-" + message.id}
//                         />
//                       ) : (
//                         message.text
//                       )}
//                       {!message.inEditMode && message.showButtons ? (
//                         <span className="butn">
//                           <button
//                             className="btn btn-danger"
//                             onClick={this.deleteMessage}
//                             id={"delete-" + message.id}
//                           >
//                             Delete
//                           </button>
//                           <button
//                             className="btn btn-primary"
//                             onClick={this.editMessage}
//                             id={"edit-" + message.id}
//                           >
//                             Edit
//                           </button>
//                         </span>
//                       ) : (
//                         ""
//                       )}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//               <div ref={this.messagesEnd}></div>
//             </div>
//             <div className="text-area">
//               <Input
//                 onSentMessage={this.onSentMessage}
//                 username={this.state.username}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
