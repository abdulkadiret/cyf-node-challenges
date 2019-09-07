const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const Chats = require("./chats.json");

app.get("/", (req, res) => {
  res.send("Welcome to CYF chatroom!");
});

app.post("/messages", (req, res) => {
  let bodyChat = req.body;
  let bodyText = bodyChat.text;
  let bodyFrom = bodyChat.from;
  bodyChat.timeStamp = new Date();

  if (bodyText === "" || bodyFrom === "") {
    res.status(400).send("Error: Message should not be empty");
  } else if (bodyText.length < 3) {
    res.status(401).send("Error: Message should be at last three characters");
  } else {
    Chats.push(bodyChat);
    res.send(Chats);
  }
});

app.get("/messages", (req, res) => {
  res.send(Chats);
});

app.get("/messages/search", (req, res) => {
  const searchText = req.query.text;
  const filteredChat = Chats.filter(chat => {
    return (
      chat.text.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.from.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  res.send(filteredChat);
});

app.get("/messages/latest", (req, res) => {
  let last10Messages = Chats.slice(-10);
  res.send(last10Messages);
});

app.get("/messages/:id", (req, res) => {
  let id = req.params.id;
  let oneChat = Chats.find(chat => chat.id === id);
  res.send(oneChat);
});

app.delete("/messages/:id", (req, res) => {
  let id = req.params.id;
  let deleteChat = Chats.find(chat => chat.id === id);
  console.log(deleteChat);
  Chats.splice(Chats.indexOf(deleteChat), 1);
  res.send(Chats);
});

app.put("/messages/", (req, res) => {
  const id = req.body.id;
  let i = Chats.findIndex(chat => {
    return chat.id === id;
  });
  Chats[i] = { ...Chats[i], ...req.body };
  res.send(Chats[i]);
});

app.listen(process.env.PORT || 3002, function() {
  console.log("Server is listening on port 3002. Ready to accept requests!");
});
