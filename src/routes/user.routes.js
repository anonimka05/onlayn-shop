const { Router } = require("express");
const userController = require("../controllers/user.controller.js");

const userRouter = Router();

userRouter
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUserById)
  .post("/add", userController.createUser)
  .put("/update/:userId", userController.updateUser)
  .delete("/delete/:userId", userController.deleteUser);

module.exports = userRouter;
