const express = require("express");
const cors = require("cors");
const path = require("path");
const { authenticateToken, login } = require("./authServer.js");
const {userSchema} = require("./graphqlUser");
const {eventSchema} = require("./graphqlEvents");
const expressGraphQL = require("express-graphql").graphqlHTTP;


let userInfo = require("./userData.json");
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json()); // to extract data from post requests(not for get request)
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "/public"))); // to serve public files like css and js

// make queries for user 
app.use(
  "/queryUser",
  expressGraphQL({
    schema: userSchema,
    graphiql: true,
  })
  );
// make queries for event 
app.use(
  "/queryEvents",
  expressGraphQL({
    schema: eventSchema,
    graphiql: true,
  })
);

//Routes

//Home Page
app.get("/", (req, res) => {
  res.render("home");
});
//Get userInfo After Homepage Loads
app.get("/getUser", authenticateToken, (req, res) => {
  let userList = userInfo.filter(
    (userInfo) => userInfo.username === req.user.name
  );
  console.log(userList)
  // Code to add new user, but is not neccesary right now 
  // if (userList=='') {
  //   const newUser={
  //     username: req.user.name,
  //     events: [],
  //   }
  //   userInfo.push(newUser);
  //   fs.writeFileSync("data.json",JSON.stringify(userInfo),(err)=>{
  //     if(err) throw err;
  //     console.log("New User Added")
  //   })

  //   res.json(newUser)
  // }
  res.json(userList);
});

//login Page
app.get("/login", (req, res) => {
  res.render("login");
});
//Create Token! And Add User
app.post("/addUser", (req, res) => {
  // console.log(login(req.body.username))
  res.send(login(req.body.username));
});
app.listen(port, () => console.log(`Main server started on port ${port}`));
