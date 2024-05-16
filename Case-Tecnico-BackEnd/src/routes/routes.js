const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
const userController = require("../controller/userController");
let adminAuth = require("../middleware/adminAuth")


router.get("/", homeController.index);
router.post("/user",adminAuth, userController.create);
router.get("/user", adminAuth, userController.index);
router.get("/user:id", userController.findUser);
router.get("/user:name", userController.findUserByName);
router.put("/user:id", userController.editUser);
router.delete("/user:id", userController.deleteUser);
router.post("/recoverpassword", userController.recoverPassword);
router.post("/changepassword", userController.changePassword);
router.post("/login", userController.login)

module.exports = router;
