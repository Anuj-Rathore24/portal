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
  console.log("This is working!")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw err;
      req.user = user;
      next();
    });
  } catch (error) {
    res.json(error)
  }
}

function generateAccessToken(user) {
  // token with expiry time of 5m
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
}


module.exports={authenticateToken,login}