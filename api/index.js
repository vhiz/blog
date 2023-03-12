const express = require("express");
const helmet = require("helmet");
const { connect } = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/users");

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: process.env.CORS,
  })
);

connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

const Port = process.env.PORT || 3009;

app.listen(Port, () => {
  console.log(`connected to port ${Port}`);
});
