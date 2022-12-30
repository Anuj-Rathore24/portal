require("dotenv").config();
const jwt = require("jsonwebtoken");



function login(u) {
  const username = u;
  const user = { name: username };
  console.log(user);
  const token = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
  return { accessToken: token, refreshToken: refreshToken }
};

function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.send("<a href='/login'>Login First</a>");
  console.log("its working bitch ->"+token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  // token with expiry time of 10s
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
}


module.exports={authenticateToken,login}