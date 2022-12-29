require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 6000;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  // to authenticate user
  const username = req.body.username;
  const user = { name: username };
  console.log(user);
  const token = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  res.json({ accessToken: token, refreshToken: refreshToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.send("<a href='/login'>Login First</a>");
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  // token with expiry time of 10s
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
}

app.listen(port, () => console.log(`AuthServer started on port ${port}`));

module.exports={authenticateToken}