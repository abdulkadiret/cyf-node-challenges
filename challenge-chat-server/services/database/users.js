const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT user_id, email, name FROM users", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getSignedInUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM signed_in_users", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const addSignedInUser = (name, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO signed_in_users (name,user_id) values ($1, $2) RETURNING *",
      [name, userId],
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const removeSignedInUser = userId => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM signed_in_users WHERE signed_in_user_id = ${userId}`,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const getUserByEmail = email => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM users where email = $1",
      [email],
      (error, result) => {
        resolve(result.rows[0]);
      }
    );
  });
};

const getUserById = userId => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM users where user_id = $1",
      [userId],
      (error, result) => {
        resolve(result && result.rows[0]);
      }
    );
  });
};

const createUser = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (name , email, password) values ($1, $2, $3) RETURNING user_id",
      [name, email, password],
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  getSignedInUsers,
  removeSignedInUser,
  addSignedInUser
};
