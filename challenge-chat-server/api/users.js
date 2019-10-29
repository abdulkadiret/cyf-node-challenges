const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByEmail,
  createUser,
  getUserById,
  getSignedInUsers,
  removeSignedInUser,
  addSignedInUser
} = require("../services/database/users");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/server.js)
 */
router.get("/", (req, res) => {
  getAllUsers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.get("/signed-in", (req, res) => {
  getSignedInUsers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/signed-in", (req, res) => {
  const { name } = req.body;
  addSignedInUser(name)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.delete("/signed-in/:userId", (req, res) => {
  const { userId } = req.params;
  removeSignedInUser(userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/email", (req, res) => {
  const { email } = req.body;
  getUserByEmail(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  getUserByEmail(email)
    .then(data => {
      if (!data || !data.email) {
        res.send({ success: false, message: "User is not exist" });
      }
      if (data && data.email && data.password !== password) {
        res.send({
          success: false,
          message: "Your password is not match"
        });
      }
      if (data && data.email && data.password === password) {
        getSignedInUsers().then(users => {
          const findUser = users.filter(user => {
            return user.user_id == data.user_id;
          });
          if (findUser && findUser.length >= 1) {
            res.send({
              data,
              signedIn: findUser[0],
              success: true,
              message: "Your are successfully logged in"
            });
          } else {
            addSignedInUser(data.name, data.user_id).then(response => {
              res.send({
                data,
                signedIn: response[0],
                success: true,
                message: "Your are successfully logged in"
              });
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500);
    });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  getUserById(userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  createUser({ email, name, password })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

module.exports = router;
