const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  getMessageByUserId,
  createMessage,
  deleteMessage,
  updateMessage
} = require("../services/database/messages");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  getAllMessages()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  getMessageByUserId(userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/", (req, res) => {
  const { message, userId } = req.body;
  createMessage({ message, userId })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.delete("/:messageId", (req, res) => {
  const { messageId } = req.params;
  deleteMessage(messageId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

router.put("/:messageId", (req, res) => {
  const { messageId } = req.params;
  updateMessage(messageId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500);
    });
});

module.exports = router;
