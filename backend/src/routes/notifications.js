const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("notifications"));

module.exports = router;
