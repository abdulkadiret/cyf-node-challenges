const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT messages.message, messages.message_id, messages.user_id, users.name FROM messages
      INNER JOIN users ON messages.user_id=users.user_id`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const getMessageByUserId = userId => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM messages where user_id = $1",
      [userId],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const createMessage = ({ message, userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO messages (message , user_id) values ($1, $2) RETURNING message",
      [message, userId],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const deleteMessage = messageId => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM messages WHERE message_id =${messageId}`,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const updateMessage = ({ message, messageId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE messages SET message=$1 WHERE message_id=$2 RETURNING *`,
      [message, messageId],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const getMessageByMessageId = messageId => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM messages where message_id = $1",
      [messageId],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result && result.rows[0]);
      }
    );
  });
};

module.exports = {
  getAllMessages,
  getMessageByUserId,
  createMessage,
  deleteMessage,
  updateMessage,
  getMessageByMessageId
};
