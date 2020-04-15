const express = require("express");
const router = express.Router();
const UserResource = require("../resource/user-resource");
const UserValidations = require("../validations/user");

router.get("/users", UserResource.index);
router.post("/users", UserValidations.ValidarRequest, UserResource.create);
router.get("/users/:id", UserResource.get);
router.put("/users/", UserResource.update);
router.delete("/users/:id", UserResource.delete);

module.exports = router;
