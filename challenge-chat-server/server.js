const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users = require("./api/users");
const messages = require("./api/messages");
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/messages", messages);

app.listen(process.env.PORT || 3002, function() {
  console.log("Server is listening on port 3002. Ready to accept requests!");
});
