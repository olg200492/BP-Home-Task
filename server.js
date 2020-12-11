const express = require("express");
const app = express();
const router = require("./router");
const { startStream } = require("./app");
const port = 3000;

startStream();

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
