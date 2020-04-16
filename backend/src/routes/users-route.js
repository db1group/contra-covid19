const express = require("express");
const router = express.Router();
const UserResource = require("../resource/user-resource");
const { validate, schemas } = require("../validations");

router.get("/users", UserResource.index);
router.post(
    "/users",
    validate(schemas.user.create),
    UserResource.create);
router.get(
    "/users/:id",
    validate(schemas.user.get, "params"),
    UserResource.get);
router.put(
    "/users/",
    validate(schemas.user.update),
    UserResource.update);

router.delete(
    "/users/:id",
    validate(schemas.user.delete, "params"),
    UserResource.delete);

module.exports = router;
