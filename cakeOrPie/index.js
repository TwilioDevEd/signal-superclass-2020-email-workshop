const http = require("http");
const express = require("express");
const sender = require("./sender");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/checkout", (req, res) => {
  console.log(`Sending confirmation email to ${req.body.email}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  sender(req.body.email, req.body.cart);
  res.end(`{"success": true}`);
});

http.createServer(app).listen(8080, () => {
  console.log("Express server listening on port 8080");
});
