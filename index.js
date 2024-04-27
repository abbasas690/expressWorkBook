import express from "express";

const app = express();
// HTTP METHODS
// get - retrive data
//post create/insert data
//put completely update data
//patch partially update data
//delete delete data
//all any request method

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/about", (req, res) => {
  res.send("<h1>about</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>contact</h1>");
});

// string pattern

app.get("/ab?cd", (req, res) => {
  res.send("if the user hit abd or abcd then this will work");
});

// Regex

app.get(/x/, (req, res) => {
  res.send("it only works if the path have (x)");
});

// nested route

app.get("/product/iphone", (req, res) => {
  res.send("only works if give the /product/iphone");
});

//callbacks
app.get("/one-cb", (req, res) => {
  res.send("single callback fucntion");
});

app.get(
  "/double-cb",
  (req, res, next) => {
    console.log("first callback function");
    next();
  },
  (req, res) => {
    res.send("sencond callback function");
  }
);
// array of callback function

const cb1 = (req, res, next) => {
  console.log("fist callback function");
  next();
};
const cb2 = (req, res, next) => {
  console.log("second callback function");
  next();
};
const cb3 = (req, res) => {
  console.log("third callback function");
  res.send("all the function is excuted");
};

app.get("/array-cb", [cb1, cb2, cb3]);

app
  .route("/student")
  .get((req, res) => {
    console.log("get all the student");
  })
  .post((req, res) => {
    console.log("add new student");
  })
  .put((req, res) => {
    console.log("update student");
  })
  .delete((req, res) => {
    console.log("delete the student");
  });

// express router
// 1.creating routes folder and put your foutes in a seprated file
//2. create instance of express.router()
//3.instead of app.method change that to "router.method"
//4.export router
//5.import trouter
//6.app.use built-in middleware & provider route

import students from "./router/student.js";
app.use("/student", students);
// route params

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  res.send(id);
});

app.get("/product/:id/:day/:month/:year", (req, res) => {
  const { id, day, month, year } = req.params;
  res.send(`${id}:${day}-${month}-${year}`);
});

//param middleware
app.param("userId", (req, res, next, id) => {
  console.log(id);
  next();
});

app.get("/user/:userId", (req, res) => {
  res.send(req.params.userId);
});

// query string ? value&paris

app.get("/query", (req, res) => {
  const { cat, id } = req.query;
  res.send(`${cat} ${id}`);
});

// JSON
const product = [
  { title: "some cool title", price: "$200", cat: "name of the cat" },
];
app.get("/productss", (req, res) => {
  res.json(product);
});

// middleware
/* 

- request
-middleware
-response

*/
import userCredentials from "./middlewares/log.js";
// app.use(userCredentials);
app.get("/login", userCredentials, (req, res) => {
  res.send("<h1>hello </h2>");
});

// serving static file
import path from "path";
app.use(express.static("./public"));
app.get("/file", (req, res) => {
  res.sendFile(path.join(process.cwd(), "./public/index.html"));
});

// templates

app.set("view engine", "ejs");

app.get("/render", (req, res) => {
  const data = {
    name: "abbas",
    userId: 13,
  };
  res.render("index", data);
});

// body parser

app.listen(8000, () => console.log("server is running"));
