import React, { Component } from "react";
import "./UsersPanel.css";

class UsersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    setInterval(this.getUsers, 500);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const url = "/api/users/signed-in";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const signedInUserId = localStorage.getItem("signedInUserId");
        const signedUser =
          data &&
          data.filter(user => {
            return user.signed_in_user_id === JSON.parse(signedInUserId);
          });
        if (!signedUser || !signedUser.length) {
          localStorage.setItem("signedInUserId", "");
          window.location.href = "/login";
        }
        this.setState({ users: data });
      });
  };

  render() {
    const { users } = this.state;
    if (users) {
      return (
        <ul>
          {users.map((user, index) => {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>
      );
    } else {
      return <p>Loading... </p>;
    }
  }
}

export default UsersPanel;

// class UsersPanel extends Component {
//   render() {
//     return (
//       <div>
//         {/* <h4 className="users-display">Users Display</h4> */}
//         <ul>
//           <li>Peter</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default UsersPanel;// class UsersPanel extends Component {
//   render() {
//     return (
//       <div>
//         {/* <h4 className="users-display">Users Display</h4> */}
//         <ul>
//           <li>Peter</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//           <li>Peter</li>
//           <li>Akey</li>
//           <li>Mimi</li>
//           <li>Peter</li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default UsersPanel;
