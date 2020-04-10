const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/users", UserController.index);
router.post("/users", UserController.create);
router.get("/users/:id", UserController.get);
router.put("/users/", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;
