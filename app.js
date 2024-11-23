const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true })); 
app.use(cookieParser());
app.use(cors());


const post = require("./routes/post");
const user = require("./routes/user");


app.use("/api/v1", post);
app.use("/api/v1", user);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
