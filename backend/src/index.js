const express = require("express");
const cors = require("cors");
require("./db/conn");

const app = express();

const http = require("http");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");

const PORT = 8080;

const server = http.createServer(app);

const { authRouter } = require("./routes/index");

app.use(cors());
app.use(cookieparser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/auth", authRouter);

server.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
