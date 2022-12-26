require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 6000;

const app = express();
app.use(cors());
app.use(express.json());

const userInfo = [
  {
    username: "anuj",
    events: [
      { eventName: "event1", date: "2022" },
      { eventName: "event2", date: "2021" },
      { eventName: "event3", date: "2020" },
    ],
  },
  {
    username: "rathore",
    events: [{ eventName: "event2", date: "2022" }],
  },
];
app.get("/", authenticateToken, (req, res) => {
    console.log(req.user)
    res.json(userInfo.filter( userInfo=>userInfo.username===req.user.name))

});

app.post("/login", (req, res) => {
  // to authenticate user

  const username = req.body.username;
  const user = { name: username };
    console.log(user)
  const token = generateAccessToken(user);
  const refreshToken=jwt.sign(user, process.env.REFRESH_TOKEN);
  res.json({ accessToken: token ,refreshToken:refreshToken});
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  console.log(token)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10s"});
}

app.listen(port, () => console.log(`The server started on port ${port}`));
