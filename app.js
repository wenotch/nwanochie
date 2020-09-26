require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const enforce = require("express-sslify");
const bodyParser = require("body-parser");
const router = express.Router();
const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const { response } = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(sslRedirect());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/sitemap", function (req, res) {
  res.sendFile(__dirname + "/sitemap.xml");
});
app.get("/robots.txt", function (req, res) {
  res.sendFile(__dirname + "/robots.txt");
});
app.get("/hello", function (req, res) {
  res.render("hello");
});

app.get("/hire", function (req, res) {
  res.render("hire");
});

app.get("/success", function (req, res) {
  res.render("success");
});

app.get("/failure", function (req, res) {
  res.render("failure");
});

app.post("/hire", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  const auth = {
    auth: {
      api_key: process.env.KEY,
      domain: process.env.DOMAIN,
    },
  };
  let transporter = nodemailer.createTransport(nodemailMailgun(auth));
  const mailOptions = {
    from: "Portfolio website <emmanuelnwanochie247@gmail.com>",
    to: "emmanuelnwanochie247@gmail.com",
    subject: "Hire Alert",
    text:
      name +
      " with email address: " +
      email +
      " wants to hire you. This is their message " +
      message,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.render("failure");
    } else {
      res.render("success");
      console.log(data);
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
