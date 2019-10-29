-- Drop tables in case they already exist


DROP TABLE IF EXISTS messages;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS signed_in_users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  message TEXT DEFAULT NULL,
  user_id INTEGER REFERENCES users (user_id)
);

CREATE TABLE signed_in_users (
  signed_in_user_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id),
  name VARCHAR(100) DEFAULT NULL
);