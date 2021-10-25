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

app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error})
  console.error(error.stack)
  next(error)
})

http.createServer(app).listen(8080, () => {
  console.log("Express server listening on port 8080");
});
