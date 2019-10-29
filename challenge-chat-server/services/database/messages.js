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
module.exports = {
  getAllMessages,
  getMessageByUserId,
  createMessage,
  deleteMessage
};