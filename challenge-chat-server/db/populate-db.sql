-- Users seed data
-- Note: Do NOT add passwords you use in real life. Passwords are now saved as clear text. This is very bad from security point of view. We will have a task to encrypt the passwords

INSERT INTO users
    (name, email, PASSWORD)
VALUES
    ('Akey', 'akey@gmail.com', 'password');

INSERT INTO users
    (name, email, PASSWORD)
VALUES
    ('Mohammed', 'mo@gmail.com', 'password');

INSERT INTO users
    (name, email, PASSWORD)
VALUES
    ('Ali', 'ali@gmail.com', 'password');

INSERT INTO messages
    (message, user_id)
VALUES
    ('Hello world', 1);

INSERT INTO messages
    (message, user_id)
VALUES
    ('It is a WeeChat app. Let us have a wee chat', 1);

INSERT INTO messages
    (message, user_id)
VALUES
    ('Hello Akey', 2);

INSERT INTO messages
    (message, user_id)
VALUES
    ('Hey Akey, it is cool!', 3);

INSERT INTO messages
    (message, user_id)
VALUES
    ('Welcome guys to my chat app', 1);