const express = require("express");
const app = express();
const { faker } = require('@faker-js/faker');
const port = 8080;
const path = require("path");
const mysql = require('mysql2');
// const methodoverride = require('method-override');


app.use(express.urlencoded({extended: true}));
// app.use(methodoverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// connecting with mysql

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test_app',
  password: 'Yadav@123',
});


//getting the count of user in server
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q, (err,result) => {
      
      if (err) throw err;
      let count = result[0]["count(*)"];
      res. render ("info.ejs", {count}) ;
      
    });
  } catch (err) {
    res.send("some error found");
  }
});

//getting details of user 
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`
  try{
    connection.query(q, (err,result) => {
      if (err) throw err;
      res.render("user.ejs", {result})
    });
  } catch (err) {
    res.send("some error found");
  }
});

//checking the value
app.get("/user/:id/check", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`
  try{
    connection.query(q, (err,result) => {
      if (err) throw err;
      let user = result[0];
      res.render("check.ejs", {user})
    });
  } catch (err) {
    res.send("some error found");
  }
});


connection.end();


app.listen(port, () => {
  console.log("listen to port: ");
});