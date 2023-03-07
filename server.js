const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config()
app.use(express.json());
const dbConfig = require("./config/dbConfig");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const usersRoute = require("./routes/usersRoute");
const courseRoute = require("./routes/courseRoute");
const assignCourse = require("./routes/assginCourseRoute");

app.use("/api/users", usersRoute);
app.use("/api/courses", courseRoute);
app.use("/api/assignCourse", assignCourse);

// required for passport
app.use(passport.initialize());
app.use(flash()); // use connect-flash for flash messages stored in session

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*' , (req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
