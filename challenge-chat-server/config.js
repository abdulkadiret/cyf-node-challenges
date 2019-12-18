const config = {
  development: {
    user: process.env.DB_USER || "akey",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "chat_app",
    password: process.env.DB_PASSWORD || "password",
    port: 5432
  },
  production: {
    connectionString: process.env.DATABASE_URL
  }
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
