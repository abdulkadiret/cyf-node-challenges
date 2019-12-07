const config = {
  development: {
    user: "akey",
    host: "localhost",
    database: "chat_app",
    password: "password",
    port: 5432
  },
  production: {
    connectionString: process.env.DATABASE_URL
    // ssl: true
  }
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
