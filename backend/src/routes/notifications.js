const express = require("express");
const router = express.Router();

router.get("/notifications", (req, res) => res.send("notifications"));
router.get("/notifications/:id", (req, res) => res.send("notifications"));
router.post("/notifications", (req, res) => res.send("notifications"));

module.exports = router;