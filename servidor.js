const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require('fs');


app.get("/", function(req, res) {
  res.render("index.ejs");
});

io.sockets.on("connection", function(socket) {
  

  socket.on("username", function(username) {
    socket.username = username;
    io.emit("is_online", "<i>" + socket.username + " se une al chat..</i>");
  });

  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      " <i>" + socket.username + " ha dejado el chat ..</i>"
    );
  
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
      );
      fs.writeFile('capturaChat/chat.txt' , message,function() {
        console.log('File saved!');
      });
  });
});
const server = http.listen(8080, function() {
  console.log("oyendo en *:8080");
});