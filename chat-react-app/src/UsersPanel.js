import React, { Component } from "react";
import "./UsersPanel.css";

// class UsersPanel extends Component {
//   render() {
//     if (this.props.users) {
//       return (
//         <ul>
//           {this.props.users.map((user, index) => {
//             return <li>{user}</li>;
//           })}
//         </ul>
//       );
//     } else {
//       return <p>Loading... </p>;
//     }
//   }
// }

// export default UsersPanel;

class UsersPanel extends Component {
  render() {
    return (
      <div>
        <h4 className="us-dis">Users Display</h4>
        <ul className="user-pane">
          <li>Peter</li>
          <li>Akeygggggggggggggggggggssssssssssssssssss</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
          <li>Peter</li>
          <li>Akey</li>
          <li>Mimi</li>
        </ul>
      </div>
    );
  }
}

export default UsersPanel;
