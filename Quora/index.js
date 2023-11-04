const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid');
const methodoverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id : uuidv4(),
    username : "prashant",
    content : "i am cool"
  },
  {
    id : uuidv4(),
    username : "raju",
    content : "i am kaka"
  },
  {
    id : uuidv4(),
    username : "tuntun",
    content : "i am mausi"
  }
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content} = req.body;
  let id = uuidv4();
  posts.push({id, username, content});
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
  let {id} = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let {id} = req.params;
  let newcontent = req.body.content;

  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  res.redirect("/posts");
});


app.get("/posts/:id/edit", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", {post});
});

app.listen(port, () => {
  console.log("listen to port: ");
});
