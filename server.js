const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute");
const courseRoute = require("./routes/courseRoute");


app.use("/api/users", usersRoute);
app.use("/api/courses", courseRoute);
const port = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, './client/build')));
app.get('*' , (req, res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
