const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
const userController = require("../controller/userController");

router.get("/", homeController.index);
router.post("/user", userController.create);
router.get("/user", userController.index);
router.get("/user:id", userController.findUser);
router.get("/user:name", userController.findUserByName);
router.put("/user:id", userController.editUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
