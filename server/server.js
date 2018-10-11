const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { mongoose } = require("./db/mongoose");

const app = express();

const corsOptions = {
  allowedHeaders: [
    "Content-Type",
    "X-Auth-Token",
    "Access-Control-Allow-Headers"
  ],
  exposedHeaders: ["X-Auth-Token"]
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

app.listen(4000, () => {
  console.log("Server started on 4000");
});

module.exports = { app };
