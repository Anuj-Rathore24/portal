const express = require("express");
const cors = require("cors");
const path=require("path")
const port = 5000;
const {authenticateToken} = require("./authServer.js")
const app = express();
app.use(cors());
app.use(express.json()); // to extract data from post requests(not for get request)
app.set("view engine","ejs")
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, "/public")));// to serve public files like css and js


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
  console.log(req.user);
  res.json(userInfo.filter((userInfo) => userInfo.username === req.user.name));
});

app.get("/login",(req,res)=>{
    res.render("login")
})

app.listen(port, () => console.log(`Main server started on port ${port}`));
