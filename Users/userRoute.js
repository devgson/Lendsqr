const express = require("express");
const router = express.Router();
const user = require("./userController");

router.get("/users", user.getAllUsers);
router.get("/user/:userId", user.getAUser);
router.post("/user", user.addUser);
router.post("/login", user.userLogin);

module.exports = router;
