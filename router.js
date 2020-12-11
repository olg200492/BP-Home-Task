const express = require("express");
const { wordCount, eventCount, stopStream } = require("./app");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Data stream began.");
});

router.get("/stop", (req, res) => {
  stopStream();
  res.send("Data stream stopped.");
});

router.get("/events", (req, res) => {
  const events = Object.fromEntries(eventCount);
  res.send({
    data: events,
  });
});

router.get("/words", (req, res) => {
 const words = Object.fromEntries(wordCount);
  res.send({
    data: words,
  });
});

router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
